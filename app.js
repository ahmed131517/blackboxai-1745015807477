document.addEventListener('DOMContentLoaded', () => {
  const questionForm = document.getElementById('question-form');
  const questionsList = document.getElementById('questions-list');
  const quizPreview = document.getElementById('quiz-preview');
  const choicesContainer = document.getElementById('choices-container');
  const addChoiceBtn = document.getElementById('add-choice');

  let questions = [];

  function renderQuestions() {
    questionsList.innerHTML = '';
    questions.forEach((q, index) => {
      const li = document.createElement('li');
      li.className = 'border border-gray-300 rounded p-2 flex justify-between items-center';
      li.innerHTML = `
        <div>
          <strong>Q${index + 1}:</strong> ${q.text} (${q.type})
        </div>
        <button class="text-red-600 hover:text-red-800" data-index="${index}" aria-label="Delete question">
          <i class="fas fa-trash"></i>
        </button>
      `;
      questionsList.appendChild(li);
    });
  }

  function renderPreview() {
    quizPreview.innerHTML = '';
    if (questions.length === 0) {
      quizPreview.innerHTML = '<p class="text-gray-500">No questions added yet.</p>';
      return;
    }
    questions.forEach((q, index) => {
      const div = document.createElement('div');
      div.className = 'mb-4';
      let choicesHtml = '';
      if (q.type === 'multiple-choice') {
        choicesHtml = q.choices.map((choice, i) => `
          <div class="flex items-center space-x-2">
            <input type="radio" name="q${index}" id="q${index}c${i}" disabled />
            <label for="q${index}c${i}">${choice}</label>
          </div>
        `).join('');
      }
      div.innerHTML = `
        <p class="font-semibold mb-1">Q${index + 1}: ${q.text}</p>
        <div>${choicesHtml}</div>
      `;
      quizPreview.appendChild(div);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('quizQuestions');
    if (saved) {
      questions = JSON.parse(saved);
      renderQuestions();
      renderPreview();
    }
  }

  function clearChoices() {
    const choiceInputs = choicesContainer.querySelectorAll('.choice-input');
    choiceInputs.forEach((input, index) => {
      if (index === 0) {
        input.value = '';
      } else {
        input.parentElement.remove();
      }
    });
  }

  addChoiceBtn.addEventListener('click', () => {
    const choiceCount = choicesContainer.querySelectorAll('.choice-input').length;
    const div = document.createElement('div');
    div.className = 'flex space-x-2';
    div.innerHTML = `
      <input type="text" class="choice-input flex-grow border border-gray-300 rounded p-2" placeholder="Choice ${choiceCount + 1}" required />
      <button type="button" class="bg-red-500 text-white px-3 rounded hover:bg-red-600 remove-choice" title="Remove Choice">
        <i class="fas fa-minus"></i>
      </button>
    `;
    choicesContainer.appendChild(div);

    div.querySelector('.remove-choice').addEventListener('click', () => {
      div.remove();
      // Re-label placeholders
      const inputs = choicesContainer.querySelectorAll('.choice-input');
      inputs.forEach((input, idx) => {
        input.placeholder = `Choice ${idx + 1}`;
      });
    });
  });

  questionsList.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
      const btn = e.target.closest('button');
      const index = parseInt(btn.getAttribute('data-index'));
      if (!isNaN(index)) {
        questions.splice(index, 1);
        renderQuestions();
        renderPreview();
        saveToLocalStorage();
      }
    }
  });

  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = questionForm['question-text'].value.trim();
    const type = questionForm['question-type'].value;
    const correctChoice = parseInt(questionForm['correct-choice'].value);

    const choiceInputs = choicesContainer.querySelectorAll('.choice-input');
    const choices = [];
    choiceInputs.forEach(input => {
      if (input.value.trim() !== '') {
        choices.push(input.value.trim());
      }
    });

    if (choices.length < 2) {
      alert('Please enter at least two choices.');
      return;
    }
    if (correctChoice < 1 || correctChoice > choices.length) {
      alert('Correct choice number is out of range.');
      return;
    }

    const question = {
      text,
      type,
      choices,
      correctChoice: correctChoice - 1 // zero-based index
    };

    questions.push(question);
    renderQuestions();
    renderPreview();
    saveToLocalStorage();

    questionForm.reset();
    clearChoices();
  });

  loadFromLocalStorage();
});
