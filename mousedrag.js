document.addEventListener('DOMContentLoaded', () => {
    let activeElement = null;
    let isDragging = false;
    let initialMouseX = 0; // Store initial mouse X on mousedown
    let initialMouseY = 0; // Store initial mouse Y on mousedown
    let initialElementX = 0; // Store initial element style.left on mousedown
    let initialElementY = 0; // Store initial element style.top on mousedown


    // Function to handle mouse move
    function onMouseMove(e) {
        if (!isDragging || !activeElement) return;

        // Prevent default browser actions (like text selection)
        // e.preventDefault(); // Only if needed, can interfere sometimes

        // Calculate the distance the mouse has moved
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;

        // Calculate the new position based on the *initial* element position
        // plus the distance the mouse has moved.
        const newLeft = initialElementX + dx;
        const newTop = initialElementY + dy;


        // Apply new position
        activeElement.style.left = `${newLeft}px`;
        activeElement.style.top = `${newTop}px`;
    }

    // Function to handle mouse up
    function onMouseUp(e) {
        if (!isDragging) return;

        isDragging = false;
        if (activeElement) {
            activeElement.classList.remove('dragging'); // Remove dragging class
        }
        activeElement = null;

        // Remove global listeners
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // Also remove from window if you added touchmove/touchend there
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    // --- Mousedown Listener (Main Change Here) ---
    document.body.addEventListener('mousedown', (e) => {
        // Check if the clicked element OR its parent has the 'move' class
        const targetElement = e.target.closest('.move');

        if (targetElement) {
            e.preventDefault(); // Prevent text selection, etc. ONLY when starting drag

            isDragging = true;
            activeElement = targetElement;
            activeElement.classList.add('dragging'); // Add dragging class

            // --- Use getComputedStyle for reliable initial position ---
            // It gets the *actual* rendered top/left, accounting for CSS,
            // even if initially set by % or other units, or inherited.
            const computedStyle = window.getComputedStyle(activeElement);
            // Use parseFloat to remove 'px' and convert to number. Default to 0 if not set.
            initialElementX = parseFloat(computedStyle.left) || 0;
            initialElementY = parseFloat(computedStyle.top) || 0;

            // Store the mouse position at the start of the drag
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;


            // Important: Attach move and up listeners to the document/window
            // to capture mouse events outside the element
            // Using window can sometimes capture events slightly better if mouse leaves browser chrome
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    });


    // Prevent default dragstart event for elements with class 'move'
    // This stops the browser's native image drag behavior
    document.querySelectorAll('.move').forEach(el => {
        el.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // --- Touch Event Support (Optional but Recommended) ---

    function onTouchMove(e) {
         if (!isDragging || !activeElement) return;
         // Prevent scrolling while dragging
         e.preventDefault();
         // Get the touch corresponding to the initial touch
         const touch = e.touches[0]; // Use the first touch
         const dx = touch.clientX - initialMouseX;
         const dy = touch.clientY - initialMouseY;
         const newLeft = initialElementX + dx;
         const newTop = initialElementY + dy;
         activeElement.style.left = `${newLeft}px`;
         activeElement.style.top = `${newTop}px`;
    }

    function onTouchEnd(e) {
         if (!isDragging) return;
         isDragging = false;
         if (activeElement) {
            activeElement.classList.remove('dragging');
         }
         activeElement = null;
         window.removeEventListener('touchmove', onTouchMove);
         window.removeEventListener('touchend', onTouchEnd);
         window.removeEventListener('touchcancel', onTouchEnd); // Handle interruption
    }

    document.body.addEventListener('touchstart', (e) => {
        const targetElement = e.target.closest('.move');
        if (targetElement) {
            // Don't preventDefault here immediately on touchstart
            // Allow default behavior like scrolling until movement starts
            // We'll preventDefault in onTouchMove if dragging occurs

            isDragging = true;
            activeElement = targetElement;
            activeElement.classList.add('dragging');

            const computedStyle = window.getComputedStyle(activeElement);
            initialElementX = parseFloat(computedStyle.left) || 0;
            initialElementY = parseFloat(computedStyle.top) || 0;

            const touch = e.touches[0]; // Get the first touch point
            initialMouseX = touch.clientX; // Use touch coordinates
            initialMouseY = touch.clientY;

            // Add touch listeners to window
            window.addEventListener('touchmove', onTouchMove, { passive: false }); // Need active listener to prevent scroll
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('touchcancel', onTouchEnd); // Handle drag interruption
        }
    }, { passive: true }); // Make touchstart listener passive initially


});