const hashTableOperations = () => {
    const fileContent = document.getElementById('file-content');
    const createTableButton = document.querySelector('.create-table');
    const hashTableBody = document.querySelector('.hash-table tbody');
    createTableButton.addEventListener('click', createHashTable, false);
    const hashTable = new Map();
    function createHashTable() {
        const text = fileContent.textContent;
        if (!text)
            return;
        text.split(/\s+/).forEach(word => {
            const hashValue = hashFunction(word);
            if (!hashTable.has(hashValue)) {
                hashTable.set(hashValue, []);
            }
            hashTable.get(hashValue).push(word);
        });
        hashTableBody.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const row = document.createElement('tr');
            const hashCell = document.createElement('td');
            const elementsCell = document.createElement('td');
            hashCell.textContent = i.toString();
            elementsCell.textContent = hashTable.has(i) ? hashTable.get(i).join(', ') : '';
            row.appendChild(hashCell);
            row.appendChild(elementsCell);
            hashTableBody.appendChild(row);
        }
    }
    function hashFunction(word) {
        if (word.length === 0)
            return 0;
        const firstChar = word.charCodeAt(0);
        const lastChar = word.charCodeAt(word.length - 1);
        return (firstChar + lastChar) % 40;
    }
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    searchButton.addEventListener('click', searchHashTable, false);
    function searchHashTable() {
        const searchValues = searchInput.value.split(" ");
        searchResults.innerHTML = '';
        searchValues.forEach(value => {
            const hashValue = hashFunction(value);
            const values = hashTable.get(hashValue);
            const result = values ? binarySearch(hashTable.get(hashValue).sort(), value) : -1;
            if (result !== -1) {
                searchResults.textContent += `Element: ${value}, Hash Value: ${hashValue}\n`;
            }
            else {
                searchResults.textContent += `Element: ${value} not found\n`;
            }
        });
    }
    function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                return mid;
            }
            else if (arr[mid] < target) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return -1;
    }
};
export default hashTableOperations;
