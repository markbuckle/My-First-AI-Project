script.js

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        //all this code runs only when the page loads
        console.log("START OF CODE");

        // get all the html elements
        const textarea = document.getElementById("textarea");
        const numberInput = document.getElementById("numberInput");
        const button = document.getElementById("button");
        const answers = document.getElementById("answer");
        console.log(textarea, numberInput, button, answers);

        // create function to run when the button is clicked:
        function buttonClickHandler() {
            console.log("START OF FUNCTION");
            // get the values of textarea and vagueness inputs:
            const problem = textarea.value;
            const vagueness = numberInput.value;
            console.log(problem, vagueness);  

            // change the result paragraph to "thinking"...
            answers.innerHTML = "Thinking...";
        
            // call OpenAI and get results and show it on the page
            const data = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                    "You are a coading coach that is helping me debug issues. Your answers should be partially vague, and on a scale of 1 to 10, they should be of vagueness level" + vagueness + ".",
                },
                {
                    role: "user",
                    content: problem,
                },
                ],
            };

            // defining a function for when the response comes back
            function handleOpenAIResponse(response) {
                const openAIResponse = response.data.choices[0].message.content;
                console.log(openAIResponse);
                answers.innerHTML = openAIResponse;
            }

            // axios.post is a function that lets us make a postman API call
            axios.post("https://api.openai.com/v1/chat/completions", data,  {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                },
            })
            // when you're done, then run this function:
            .then(handleOpenAIResponse);

            //make an API call to OpenAI and get the answer and show it on the page:
            console.log("END OF FUNCTION");
    
        }
       
        // tell the button to run our function when clicked:
        button.addEventListener("click", buttonClickHandler);
        console.log("END OF CODE");
    </script>
