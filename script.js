// script.js

let categoriesData = [];

function addCategory() {
  const categoryContainer = document.getElementById('categories');
  const categoryTemplate = document.querySelector('.category').cloneNode(true);
  categoryContainer.appendChild(categoryTemplate);
}

function addCustomCategory() {
  const customCategory = prompt('Enter custom category:');
  if (customCategory !== null && customCategory.trim() !== '') {
    const categoryContainer = document.getElementById('categories');
    const categoryTemplate = document.querySelector('.category').cloneNode(true);

    // Update the select options with the custom category
    const selectElement = categoryTemplate.querySelector('select');
    const newOption = document.createElement('option');
    newOption.value = customCategory.toLowerCase();
    newOption.textContent = customCategory;
    selectElement.appendChild(newOption);

    categoryContainer.appendChild(categoryTemplate);
  }
}

document.getElementById('budgetForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value);

  const categories = document.querySelectorAll('.category');

  categoriesData = Array.from(categories).map((category) => {
    const categoryName = category.querySelector('select').value;
    const amountSpent = parseFloat(category.querySelector('input').value);

    return { categoryName, amountSpent };
  });

  displayChart(monthlyBudget);
});

function displayChart(monthlyBudget) {
  const chartContainer = document.getElementById('chartContainer');

  const ctx = document.createElement('canvas');
  chartContainer.innerHTML = '';
  chartContainer.appendChild(ctx);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categoriesData.map((category) => category.categoryName),
      datasets: [
        {
          data: categoriesData.map((category) => category.amountSpent),
          backgroundColor: ['#faf1e4', '#cedebe', '#9eb384', '#435334'],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `Budget Distribution ($${monthlyBudget} Budget)`,
        fontSize: 16,
      },
    },
  });
}
