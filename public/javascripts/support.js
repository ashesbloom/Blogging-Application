function deleteAlert(url) {
    try {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const swalOptions = {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        };

        if (isDarkMode) {
            swalOptions.background = '#333';
            swalOptions.color = '#fff';
            document.body.classList.add('modal-active');
        }
        
        Swal.fire(swalOptions).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your blog has been deleted.",
                    icon: "success",
                    showConfirmButton: false, 
                });

                if (isDarkMode) {
                    Swal.update({
                        background: '#333',
                        color: '#fff'
                    });
                }

                const response = await fetch(url, { method: 'DELETE' });
                const result = await response.json();
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (isDarkMode) {
                    document.body.classList.remove('modal-active');
                }
                if (result.redirect) {
                    window.location.href = result.redirect;
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const targetDiv = document.getElementById('target-div');
    const cursorMessage = document.getElementById('cursor-message');
    let messageVisible = false; // Flag to track message visibility
    
    document.addEventListener('mousemove', function(e) {
      const { top, left, width, height } = targetDiv.getBoundingClientRect();
      
      // Check if cursor is near the target div
      const isNear = e.clientX >= left && e.clientX <= left + width &&
                     e.clientY >= top && e.clientY <= top + height;
  
      // Show or hide the message based on proximity
      if (isNear) {
        if (!messageVisible) {
          cursorMessage.style.display = 'block'; // Show the message
          messageVisible = true;
        }
        cursorMessage.style.left = `${e.clientX}px`;
        cursorMessage.style.top = `${e.clientY - 30}px`; // Adjusted to appear just above the cursor
        cursorMessage.style.transform = `translate(-50%, -50%)`; // Adjust for centering
      } else {
        cursorMessage.style.display = 'none'; // Hide the message if not near
        messageVisible = false;
      }
    });
  });
  

  function shareLinkedIn(event) {
    event.preventDefault(); // Prevent the default action of the link
    const currentUrl = encodeURIComponent(window.location.href);
    const copiedText = decodeURIComponent(window.location.href); 
    const text = 'Check out this link'+ copiedText;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank'); // Open LinkedIn sharing page in new tab
  }

  function shareWhatsApp(event) {
    event.preventDefault(); // Prevent the default action of the link
    const currentUrl = encodeURIComponent(window.location.href); // Encode current URL
    const shareUrl = `https://api.whatsapp.com/send?text=Check%20out%20this%20link:%20${currentUrl}&text=Check%20out%20this%20link`;
    window.open(shareUrl, '_blank'); // Open WhatsApp sharing page in new tab
  }

  function shareTwitter(event) {
    event.preventDefault(); // Prevent the default action of the link
    const currentUrl = encodeURIComponent(window.location.href); // Encode current URL
    const shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=Check%20out%20this%20link`;
    window.open(shareUrl, '_blank'); // Open Twitter sharing page in new tab
  }

let copiedText = decodeURIComponent(window.location.href); 
let copyButton = document.getElementById("link"); //the copy icon
let copySuccess = document.querySelector(".msg"); //the message to be displayed after copying

// Add event listener to the copy icon
copyButton.addEventListener("click", function(event) {
    event.preventDefault()
    // Create a temporary textarea element
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = copiedText;
    // Append the textarea to the body (required for it to be selectable)
    document.body.appendChild(tempTextArea);

    // Select the text
    tempTextArea.select();
    // For mobile devices
    tempTextArea.setSelectionRange(0, 99999);

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(tempTextArea.value).then(function(){  //we could also use document.execCommand('copy') but it is deprecated
        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);

        // Display the copy message
        copySuccess.style.visibility = "visible";
        setTimeout(function(){
            copySuccess.style.visibility = "hidden";
        },1000);
    }).catch(err =>{
        console.error('Failed to copy: ',err);
    })
});

document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.getElementById('progress');

  const updateProgressBar = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(document.documentElement.scrollHeight === document.documentElement.clientHeight){
      progressBar.style.width = '100%';
      progressBar.style.backgroundColor = '#AAFF00';
      return;
    }
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
    
  };

  document.addEventListener('scroll', updateProgressBar);

  updateProgressBar();
});
