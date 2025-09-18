package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"wails-test/services"
)

// App struct
type App struct {
	ctx          context.Context
	timerService *services.TimerService
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		timerService: services.NewTimerService(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.timerService.SetContext(ctx)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// StartTaskTimer starts a timer for a specific task
// If a timer is already running, it will switch to the new task
func (a *App) StartTaskTimer(taskName string) {
	a.timerService.StartTimer(taskName)
}

// SwitchTaskTimer explicitly switches from current task to a new task
func (a *App) SwitchTaskTimer(newTaskName string) bool {
	return a.timerService.SwitchTimer(newTaskName)
}

// StopTimer stops the currently running timer
func (a *App) StopTimer() {
	a.timerService.StopTimer()
}

// GetTimerStatus returns the current timer status
func (a *App) GetTimerStatus() map[string]any {
	return a.timerService.GetStatus()
}

// SaveNote writes the note to a file and returns the file path.
func (a *App) SaveNote(title string, body string) (string, error) {
	// Choose a location (here: user home dir under "notes")
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	notesDir := filepath.Join(homeDir, "wails-notes")
	err = os.MkdirAll(notesDir, 0755) // make sure directory exists
	if err != nil {
		return "", err
	}

	// Construct filename (e.g. title.txt)
	filename := fmt.Sprintf("%s.txt", title)
	filePath := filepath.Join(notesDir, filename)

	// Write body to the file
	err = os.WriteFile(filePath, []byte(body), 0644)
	if err != nil {
		return "", err
	}

	// Return the saved file path back to frontend
	return "Note saved at: " + filePath, nil
}
