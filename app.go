package main

import (
	"context"
	"fmt"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// StartTimer starts a timer that ticks every second and sends updates to frontend
func (a *App) StartTimer() {
	go func() {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()

		count := 0
		for {
			select {
			case <-ticker.C:
				count++
				message := fmt.Sprintf("Timer: %d seconds", count)
				// Send event to frontend
				runtime.EventsEmit(a.ctx, "timer_tick", message)
			case <-a.ctx.Done():
				// Stop if app context is closed
				return
			}
		}
	}()
}
