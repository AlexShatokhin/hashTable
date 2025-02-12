const DnDOutput = () => {
    const fileElem = document.getElementById('fileElem') as HTMLInputElement;
    const dropArea = document.querySelector('.drop-area') as HTMLDivElement;
    const fileContent = document.getElementById('file-content') as HTMLDivElement;

    fileElem.addEventListener('change', handleFiles, false);
    dropArea.addEventListener('dragover', handleDragOver, false);
    dropArea.addEventListener('drop', handleDrop, false);

    function handleFiles() {
        const file = fileElem.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target) {
                    fileContent.textContent = (e.target as FileReader).result as string;
                }
            };
            reader.readAsText(file[0]);
        }
    }

    function handleDragOver(e : any) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.add('dragover');
    }

    function handleDrop(e : any) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.remove('dragover');
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if(e.target)
                    fileContent.textContent = e.target.result as string;
            };
            reader.readAsText(file);
        }
    }
};

export default DnDOutput;