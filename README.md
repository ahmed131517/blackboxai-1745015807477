
Built by https://www.blackbox.ai

---

```markdown
# Quiz Creator App

## Project Overview
The Quiz Creator App is a web-based application designed to help users create, manage, and preview their quizzes easily. Users can add multiple-choice questions, specify the correct answer, and see a real-time preview of the quiz. The application stores questions in the local storage, allowing persistent access across sessions.

## Installation
To run the Quiz Creator App locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
   
2. Change into the project directory:
   ```bash
   cd quiz-creator-app
   ```

3. Open `index.html` in your preferred web browser.

No additional installation of libraries or packages is required, as the necessary dependencies are linked via CDN in the HTML file.

## Usage
1. Open the application in your browser.
2. Fill in the question text and select the question type (currently only "Multiple Choice" is available).
3. Add choices for the question using the "Add Choice" button.
4. Specify the number of the correct choice.
5. Click "Add Question" to save the question to your quiz.
6. Review your questions in the "Questions List" and see the quiz preview.

To delete a question, click the trash can icon next to the respective question in the list.

## Features
- Create multiple-choice questions.
- Add and remove answer choices dynamically.
- Specify the correct answer for each question.
- View a real-time preview of the quiz.
- Persistent storage of questions using local storage.

## Dependencies
The project relies on the following external libraries:
- [Tailwind CSS](https://tailwindcss.com/) for styling (loaded via CDN).
- [Font Awesome](https://fontawesome.com/) for icons (loaded via CDN).

## Project Structure
The project consists of the following files:
```
/quiz-creator-app
|-- index.html         # Main HTML file for the application
|-- app.js             # JavaScript file containing the application's logic
```

### File Descriptions
- `index.html`: The main file that structures the application and connects the CSS and JavaScript resources.
- `app.js`: Contains the logic for managing quiz questions, storing them, rendering them on the page, and facilitating user interactions.

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to contribute to this project by opening issues or submitting pull requests. Enjoy creating quizzes!
```