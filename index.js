function entry(name, expense) {
  return `<div class="row">
    <span>${name}</span>
    <span class="entry-value">$ ${expense}</span>
    <button class="delete">&#128465</button>
    </div>`;
}

function validateAmount(amount) {
  if (!amount.trim() || !Number(amount) || !amount > 0) {
    return false;
  }
  return Number(amount);
}

function displayError(input, message) {
  const parent_div = input.parent();
  parent_div.attr('error', `${message}`);
  setTimeout(() => {
    parent_div.attr('error', '');
  }, 2000);
}

let sum = 0;
$(document).ready(() => {
  $('#add').click(() => {
    const expense_input = $('#expense-input');
    const amount_input = $('#amount-input');
    const expense = expense_input.val().trim();
    const amount = validateAmount(amount_input.val());
    if (!expense) {
      displayError(expense_input, 'Please enter a valid input');
    } else if (!amount) {
      displayError(amount_input, 'Please enter a valid number');
    } else {
      const item = $(entry(expense, amount));
      $('#expenses-container').append(item);
      item.find('.delete').click(function () {
        console.log('delete');
        sum -= item.find('.entry-value').val();
        item.remove();
        sum -= amount;
        $('#total').text(sum);
      });
      sum += amount;
      $('#total').text(sum);
    }
  });
});
