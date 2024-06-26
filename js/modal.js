function openModal() {
    document.getElementById('uploadModal').style.display = 'block';
    const uploadField = document.getElementById('gameImage');
    uploadField.onchange = function () {
        const file = this.files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            this.value = '';
            return;
        }
        console.log(file.size);
        // if(this.files[0].size > 2097152) {
        //    alert("File is too big! Needs to be smaller than 2MB.");
        //    this.value = "";
        // }

    };
}

function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

//when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('uploadModal')) {
        closeModal();
    }
}