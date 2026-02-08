// Student Grade Calculator - Conditional Logic Implementation
const GRADES = [
  { min: 90, grade: 'A', label: 'Excellent' },
  { min: 80, grade: 'B', label: 'Good' },
  { min: 70, grade: 'C', label: 'Satisfactory' },
  { min: 60, grade: 'D', label: 'Pass' },
  { min: 0, grade: 'F', label: 'Fail' }
];

const MAX_MARKS = 100;

function getGrade(percentage) {
  if (percentage < 0 || percentage > 100 || isNaN(percentage)) return null;
  for (const g of GRADES) {
    if (percentage >= g.min) return g;
  }
  return GRADES[GRADES.length - 1];
}

function generateSubjectFields() {
  const countInput = document.getElementById('subject-count');
  const container = document.getElementById('subjects-container');

  let count = parseInt(countInput.value, 10);
  if (isNaN(count) || count < 1) {
    count = 5;
    countInput.value = 5;
  }
  if (count > 20) {
    count = 20;
    countInput.value = 20;
  }

  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML = `
      <label>Subject ${i}:</label>
      <input type="number" class="subject-marks" data-subject="${i}" min="0" max="${MAX_MARKS}" placeholder="Marks (0-100)">
    `;
    container.appendChild(row);
  }
}

function calculateGrade() {
  const inputs = document.querySelectorAll('.subject-marks');
  const resultsEl = document.getElementById('results');

  if (inputs.length === 0) {
    resultsEl.innerHTML = '<p class="error-msg">Please generate subject fields first.</p>';
    resultsEl.classList.add('visible');
    return;
  }

  let total = 0;
  let validCount = 0;
  const invalidInputs = [];

  inputs.forEach((input, idx) => {
    const value = input.value.trim();
    if (value === '') {
      invalidInputs.push(`Subject ${idx + 1}`);
      return;
    }

    const marks = parseFloat(value);
    if (isNaN(marks) || marks < 0 || marks > MAX_MARKS) {
      invalidInputs.push(`Subject ${idx + 1}`);
      return;
    }

    total += marks;
    validCount++;
  });

  if (invalidInputs.length > 0) {
    resultsEl.innerHTML = `<p class="error-msg">Invalid or missing marks for: ${invalidInputs.join(', ')}. Enter marks between 0-100.</p>`;
    resultsEl.classList.add('visible');
    return;
  }

  const totalMarks = validCount * MAX_MARKS;
  const percentage = (total / totalMarks) * 100;
  const gradeInfo = getGrade(percentage);

  resultsEl.innerHTML = `
    <h3>Results</h3>
    <p><strong>Total Marks:</strong> ${total} / ${totalMarks}</p>
    <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
    <p class="grade grade-${gradeInfo.grade}">Grade: ${gradeInfo.grade} — ${gradeInfo.label}</p>
  `;
  resultsEl.classList.add('visible');
}

document.getElementById('generate-btn').addEventListener('click', generateSubjectFields);
document.getElementById('calculate-btn').addEventListener('click', calculateGrade);

// Initial load
generateSubjectFields();
