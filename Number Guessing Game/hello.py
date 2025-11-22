import customtkinter as ctk
import random

# Initialize main window
ctk.set_appearance_mode("dark")  # "light" or "dark"
ctk.set_default_color_theme("blue")

app = ctk.CTk()
app.title("Number Guessing Game")
app.geometry("400x400")

# Game variables
number_to_guess = random.randint(1, 100)
attempts = 0

# Functions
def check_guess():
    global attempts
    guess = guess_entry.get()
    if not guess.isdigit():
        result_label.configure(text="⚠️ Enter a valid number!", text_color="yellow")
        return
    guess = int(guess)
    attempts += 1

    if guess < number_to_guess:
        result_label.configure(text="📉 Too low! Try again.", text_color="orange")
    elif guess > number_to_guess:
        result_label.configure(text="📈 Too high! Try again.", text_color="orange")
    else:
        result_label.configure(text=f"🎉 Correct! You guessed it in {attempts} tries!", text_color="green")
        check_button.configure(state="disabled")

def restart_game():
    global number_to_guess, attempts
    number_to_guess = random.randint(1, 100)
    attempts = 0
    result_label.configure(text="Guess a number between 1 and 100")
    guess_entry.delete(0, "end")
    check_button.configure(state="normal")

# UI elements
title_label = ctk.CTkLabel(app, text="🎯 Number Guessing Game", font=("Arial", 22, "bold"))
title_label.pack(pady=20)

result_label = ctk.CTkLabel(app, text="Guess a number between 1 and 100", font=("Arial", 16))
result_label.pack(pady=10)

guess_entry = ctk.CTkEntry(app, placeholder_text="Enter your guess", width=200)
guess_entry.pack(pady=10)

check_button = ctk.CTkButton(app, text="Check Guess", command=check_guess)
check_button.pack(pady=10)

restart_button = ctk.CTkButton(app, text="Restart Game", command=restart_game)
restart_button.pack(pady=10)

exit_button = ctk.CTkButton(app, text="Exit", command=app.destroy, fg_color="red")
exit_button.pack(pady=10)

app.mainloop()
