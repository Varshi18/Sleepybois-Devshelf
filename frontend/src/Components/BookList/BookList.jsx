import React from 'react';

const BookList = ({ title, books, onIssueDateChange }) => {
  return (
    <div className=" mt-12 bg-[#ffffff] dark:bg-slate-900 p-6 rounded-lg shadow-md lg:p-10 dark:text-[#ffffff]">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-[#ffffff] mb-4">{title}</h3>
      <ul className="space-y-6">
        {books.map(book => (
          <li key={book.id} className="flex flex-col lg:flex-row items-center lg:items-start">
            <img src={book.image} alt={book.title} className="w-full lg:w-32 xl:w-40 h-auto object-cover rounded-lg mb-4 lg:mb-0" />
            <div className="flex-1 lg:ml-6">
              <div className="text-lg font-semibold text-gray-800 dark:text-[#ffffff]">{book.title}</div>
              <div className="text-gray-600 dark:text-gray-200">
                <span>Issue Date: {formatDateDisplay(book.issueDate)}</span>
                <span className="ml-4">Return Date: {formatDateDisplay(book.returnDate)}</span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="bg-gray-200 w-full h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getProgressBarColor(book.issueDate, book.returnDate)}`} style={{ width: getProgressBarWidth(book.issueDate, book.returnDate) }}></div>
                </div>
                <span className="ml-2 text-sm font-semibold text-red-600">{getAlertMessage(book.issueDate, book.returnDate)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatDateDisplay(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

function getProgressBarWidth(issueDate, returnDate) {
  const totalDuration = new Date(returnDate) - new Date(issueDate);
  const elapsedDuration = Date.now() - new Date(issueDate);
  const progressPercentage = (elapsedDuration / totalDuration) * 100;
  return `${Math.min(progressPercentage, 100)}%`;
}

function getProgressBarColor(issueDate, returnDate) {
  if (new Date(issueDate) > Date.now()) {
    return 'bg-gray-400';
  } else if (new Date(returnDate) < Date.now()) {
    return 'bg-red-600';
  }
  return 'bg-green-500';
}

function getAlertMessage(issueDate, returnDate) {
  if (new Date(issueDate) > Date.now()) {
    return 'Invalid Issue Date';
  } else if (new Date(returnDate) < Date.now()) {
    return 'Return Date Passed';
  }
  return '';
}

export default BookList;
