package services

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// TimerService handles all timer-related operations
type TimerService struct {
	isRunning     bool
	currentTask   string
	startTime     time.Time
	totalTime     int64
	taskDuration  int64
	mutex         sync.RWMutex
	ctx           context.Context
	ticker        *time.Ticker
	stopTicker    chan bool
}

// NewTimerService creates a new timer service
func NewTimerService() *TimerService {
	return &TimerService{
		isRunning:    false,
		currentTask:  "",
		totalTime:    0,
		taskDuration: 0,
		stopTicker:   make(chan bool),
	}
}

// SetContext sets the context for runtime events
func (ts *TimerService) SetContext(ctx context.Context) {
	ts.mutex.Lock()
	defer ts.mutex.Unlock()
	ts.ctx = ctx
}

// StartTimer starts a timer for a specific task
// If a timer is already running, it will switch to the new task
func (ts *TimerService) StartTimer(taskName string) {
	ts.mutex.Lock()
	defer ts.mutex.Unlock()

	if ts.isRunning {
		// Stop current task and add to total
		elapsed := time.Since(ts.startTime).Milliseconds()
		ts.totalTime += elapsed
		ts.taskDuration = elapsed
	}

	ts.isRunning = true
	ts.currentTask = taskName
	ts.startTime = time.Now()
	fmt.Printf("Timer started for task: %s\n", taskName)

	// Start the ticker for periodic updates
	ts.startTicker()
}

// SwitchTimer explicitly switches from current task to a new task
func (ts *TimerService) SwitchTimer(newTaskName string) bool {
	ts.mutex.Lock()
	defer ts.mutex.Unlock()

	if !ts.isRunning {
		fmt.Printf("No timer is currently running to switch from\n")
		return false
	}

	if ts.currentTask == newTaskName {
		fmt.Printf("Already running timer for task: %s\n", newTaskName)
		return false
	}

	// Calculate elapsed time for current task
	elapsed := time.Since(ts.startTime).Milliseconds()
	oldTask := ts.currentTask
	ts.totalTime += elapsed

	// Start new task
	ts.currentTask = newTaskName
	ts.startTime = time.Now()

	fmt.Printf("Switched from task '%s' (%d ms) to task '%s'\n", oldTask, elapsed, newTaskName)
	return true
}

// StopTimer stops the currently running timer
func (ts *TimerService) StopTimer() {
	ts.mutex.Lock()
	defer ts.mutex.Unlock()

	if !ts.isRunning {
		fmt.Printf("No timer is currently running\n")
		return
	}

	// Calculate elapsed time for current task
	elapsed := time.Since(ts.startTime).Milliseconds()
	ts.totalTime += elapsed
	ts.taskDuration = elapsed
	completedTask := ts.currentTask

	// Stop the ticker
	ts.stopTickerFunc()

	// Reset timer state
	ts.isRunning = false
	ts.currentTask = ""

	fmt.Printf("Timer stopped for task: %s (Duration: %d ms, Total: %d ms)\n",
		completedTask, ts.taskDuration, ts.totalTime)
}

// GetStatus returns the current timer status
func (ts *TimerService) GetStatus() map[string]any {
	ts.mutex.RLock()
	defer ts.mutex.RUnlock()

	var currentElapsed int64 = 0
	if ts.isRunning {
		currentElapsed = time.Since(ts.startTime).Milliseconds()
	}

	return map[string]any{
		"isRunning":    ts.isRunning,
		"currentTask":  ts.currentTask,
		"taskDuration": currentElapsed,
		"totalTime":    ts.totalTime,
	}
}

// startTicker starts the periodic timer updates
func (ts *TimerService) startTicker() {
	// Stop any existing ticker first
	ts.stopTickerFunc()

	ts.ticker = time.NewTicker(100 * time.Millisecond) // Update every 100ms
	go func() {
		for {
			select {
			case <-ts.ticker.C:
				if ts.ctx != nil && ts.isRunning {
					currentElapsed := time.Since(ts.startTime).Milliseconds()
					timerData := map[string]any{
						"task":         ts.currentTask,
						"taskDuration": currentElapsed,
						"totalTime":    ts.totalTime + currentElapsed,
						"isRunning":    ts.isRunning,
					}
					runtime.EventsEmit(ts.ctx, "timer_tick", timerData)
				}
			case <-ts.stopTicker:
				return
			}
		}
	}()
}

// stopTickerFunc stops the periodic timer updates
func (ts *TimerService) stopTickerFunc() {
	if ts.ticker != nil {
		ts.ticker.Stop()
		select {
		case ts.stopTicker <- true:
		default:
		}
		ts.ticker = nil
	}
}

