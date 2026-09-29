// ============================================
// RECALLDESK FRONTEND
// DEMO VERSION
// ============================================


// ============================================
// DEMO MODE
// ============================================
//
// Person 1 has not given us the backend URL yet.
//
// So for now:
// true  = use demo data
// false = use real backend
//
// DO NOT change this to false yet.
//

const DEMO_MODE = false;


// ============================================
// REAL BACKEND URL
// ============================================
//
// We will get the real URL from Person 1 later.
//
// Leave this as it is for now.
//

const BACKEND_URL = "http://127.0.0.1:5001/chat";


// ============================================
// GET HTML ELEMENTS
// ============================================

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const chatMessages =
    document.getElementById("chatMessages");

const memoryList =
    document.getElementById("memoryList");

const memoryCount =
    document.getElementById("memoryCount");


// ============================================
// ADD MESSAGE TO CHAT
// ============================================

function addMessage(sender, message) {

    // Create the main message container
    const messageContainer =
        document.createElement("div");

    messageContainer.classList.add("message");


    // Create sender name
    const label =
        document.createElement("div");

    label.classList.add("message-label");


    // Create message bubble
    const bubble =
        document.createElement("div");

    bubble.classList.add("message-bubble");


    // ========================================
    // CUSTOMER MESSAGE
    // ========================================

    if (sender === "customer") {

        messageContainer.classList.add(
            "customer-message"
        );

        label.textContent =
            "Sarah Johnson";

    }


    // ========================================
    // AGENT MESSAGE
    // ========================================

    else {

        messageContainer.classList.add(
            "agent-message"
        );

        label.textContent =
            "RecallDesk";

    }


    // Put message text inside bubble

    bubble.textContent = message;


    // Put label inside message container

    messageContainer.appendChild(label);


    // Put bubble inside message container

    messageContainer.appendChild(bubble);


    // Add complete message to chat

    chatMessages.appendChild(
        messageContainer
    );


    // Automatically scroll to bottom

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ============================================
// SHOW LOADING MESSAGE
// ============================================

function showLoadingMessage() {

    // Create loading container

    const loadingContainer =
        document.createElement("div");

    loadingContainer.id =
        "loadingMessage";

    loadingContainer.classList.add(
        "message",
        "agent-message"
    );


    // Create label

    const label =
        document.createElement("div");

    label.classList.add(
        "message-label"
    );

    label.textContent =
        "RecallDesk";


    // Create loading bubble

    const bubble =
        document.createElement("div");

    bubble.classList.add(
        "message-bubble",
        "loading"
    );

    bubble.textContent =
        "Thinking and retrieving memory...";


    // Add label

    loadingContainer.appendChild(
        label
    );


    // Add bubble

    loadingContainer.appendChild(
        bubble
    );


    // Add loading message to chat

    chatMessages.appendChild(
        loadingContainer
    );


    // Scroll to bottom

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ============================================
// REMOVE LOADING MESSAGE
// ============================================

function removeLoadingMessage() {

    const loadingMessage =
        document.getElementById(
            "loadingMessage"
        );


    if (loadingMessage) {

        loadingMessage.remove();

    }
}


// ============================================
// DISPLAY MEMORIES
// ============================================

function displayMemories(memories) {

    // Remove old memories

    memoryList.innerHTML = "";


    // ========================================
    // IF THERE ARE NO MEMORIES
    // ========================================

    if (
        !memories ||
        memories.length === 0
    ) {

        memoryList.innerHTML = `
            <div class="empty-memory">
                No relevant memories found.
            </div>
        `;

        memoryCount.textContent = "0";

        return;
    }


    // ========================================
    // DISPLAY MEMORY COUNT
    // ========================================

    memoryCount.textContent =
        memories.length;


    // ========================================
    // DISPLAY EACH MEMORY
    // ========================================

    memories.forEach(
        (memory, index) => {

            // Create memory box

            const memoryItem =
                document.createElement("div");

            memoryItem.classList.add(
                "memory-item"
            );


            // Create memory title

            const title =
                document.createElement("div");

            title.classList.add(
                "memory-title"
            );

            title.textContent =
                `Memory ${index + 1}`;


            // Create memory content

            const content =
                document.createElement("div");


            // If memory is already text
            // display it directly.

            if (
                typeof memory === "string"
            ) {

                content.textContent =
                    memory;

            }

            // If memory is an object
            // convert it to text.

            else {

                content.textContent =
                    JSON.stringify(
                        memory
                    );

            }


            // Add title to memory box

            memoryItem.appendChild(
                title
            );


            // Add content to memory box

            memoryItem.appendChild(
                content
            );


            // Add memory box to page

            memoryList.appendChild(
                memoryItem
            );

        }
    );
}


// ============================================
// DEMO RESPONSE
// ============================================
//
// This is temporary.
//
// This information is NOT coming from Hindsight.
//
// We are only using it to test the frontend.
//

function getDemoResponse() {

    return {

        response:
            "I remember that you previously experienced a checkout timeout on your Windows setup. You are using the Pro plan, and clearing the browser cache helped resolve the issue last time. Let's try that again.",

        memories: [

            "Sarah Johnson uses the Pro plan.",

            "Sarah Johnson uses a Windows environment.",

            "Sarah previously experienced a checkout timeout.",

            "Clearing the browser cache previously resolved the checkout issue."

        ]

    };
}


// ============================================
// SEND MESSAGE
// ============================================

async function sendMessage() {

    // Get text from input box

    const message =
        messageInput.value.trim();


    // ========================================
    // DON'T SEND EMPTY MESSAGE
    // ========================================

    if (!message) {

        return;

    }


    // ========================================
    // SHOW CUSTOMER MESSAGE
    // ========================================

    addMessage(
        "customer",
        message
    );


    // ========================================
    // CLEAR INPUT BOX
    // ========================================

    messageInput.value = "";


    // ========================================
    // DISABLE SEND BUTTON
    // ========================================

    sendButton.disabled = true;


    // ========================================
    // SHOW LOADING
    // ========================================

    showLoadingMessage();


    // ========================================
    // DEMO MODE
    // ========================================

    if (DEMO_MODE) {

        // Wait 1 second.
        //
        // This makes it look like the AI
        // is processing the request.

        await new Promise(
            resolve => setTimeout(
                resolve,
                1000
            )
        );


        // Remove loading message

        removeLoadingMessage();


        // Get demo response

        const demoData =
            getDemoResponse();


        // Show AI response

        addMessage(
            "agent",
            demoData.response
        );


        // Show demo memories

        displayMemories(
            demoData.memories
        );


        // Enable Send button again

        sendButton.disabled = false;


        // Put cursor back in input

        messageInput.focus();


        // STOP HERE
        //
        // We don't want to call the backend
        // while DEMO_MODE is true.

        return;
    }


    // ========================================
    // REAL BACKEND MODE
    // ========================================
    //
    // We will use this later after Person 1
    // gives us the actual backend URL.
    //


    try {

        // Send request to backend

        const response =
            await fetch(
                BACKEND_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        customer_name:
                            "Sarah Johnson",

                        message:
                            message

                    })

                }
            );


        // ====================================
        // CHECK RESPONSE
        // ====================================

        if (!response.ok) {

            throw new Error(
                `Backend returned status ${response.status}`
            );

        }


        // ====================================
        // CONVERT RESPONSE TO JSON
        // ====================================

        const data =
            await response.json();


        // ====================================
        // REMOVE LOADING
        // ====================================

        removeLoadingMessage();


        // ====================================
        // SHOW AGENT RESPONSE
        // ====================================

        addMessage(
            "agent",
            data.message
        );


        // ====================================
        // SHOW MEMORIES
        // ====================================

        displayMemories(
            data.memories
        );

    }


    // ========================================
    // ERROR
    // ========================================

    catch (error) {

        // Remove loading message

        removeLoadingMessage();


        // Print error in browser console

        console.error(
            "Error communicating with backend:",
            error
        );


        // Show error message in chat

        addMessage(
            "agent",
            "Sorry, I could not connect to the support backend. Please check that the backend is running."
        );

    }


    // ========================================
    // ENABLE SEND BUTTON AGAIN
    // ========================================

    sendButton.disabled = false;


    // Put cursor back in input

    messageInput.focus();
}


// ============================================
// SEND BUTTON CLICK
// ============================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ============================================
// ENTER KEY
// ============================================

messageInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);