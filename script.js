var $messages = $('.messages-content'),
d, h, m,
step = 0;

const responses = [
{ keywords: ["hello", "hi", "hey"], response: "Hello! Welcome to Tangio. How can we assist you today?" },
{ keywords: ["about", "company", "who are you"], response: "Tangio is a communication design studio offering creative services such as branding, web design, video production, and more." },
{ keywords: ["contact", "reach", "email"], response: "You can reach us via email or phone. Alternatively, schedule a consultation with us to discuss your project in detail." },
{ keywords: ["branding", "brand identity", "logo"], response: "Our branding services include logo design, brand strategy, and visual guidelines that make your brand memorable and distinctive." },
{ keywords: ["website", "web design", "site"], response: "We create responsive, user-friendly websites tailored to your needs." },
{ keywords: ["social media", "campaigns", "content"], response: "We help you build a strong online presence to connect with your audience through strategy, content creation, and campaign management." },
{ keywords: ["video production", "video", "production"], response: "From concept to execution, our video production services cover everything: corporate videos, ads, explainer videos, and more." },
{ keywords: ["process", "workflow", "approach"], response: "Our process is collaborative: discovery, creative design, development, and implementation with constant feedback." },
{ keywords: ["timeline", "duration", "timeframe"], response: "Timelines depend on the project complexity. For example, branding takes 3-4 weeks; a website could take 6-8 weeks." },
{ keywords: ["team", "experience", "team members"], response: "Tangio’s team consists of experienced designers, developers, and strategists, each bringing unique skills to the table." },
{ keywords: ["why choose you", "why tangio", "why us"], response: "Choose Tangio for creativity, attention to detail, and solutions that resonate with your audience." },
{ keywords: ["pricing", "cost", "quote", "budget"], response: "Pricing is customized based on your project scope. Let us know your needs for a tailored quote." },
{ keywords: ["careers", "work with you", "join the team"], response: "Check our careers page for openings, or send your resume for future opportunities." }
];

// Function to handle user input and match keywords
function getResponse(userInput) {
userInput = userInput.toLowerCase(); // Convert input to lowercase for matching
for (const item of responses) {
    // Check if any keyword in the list matches the user input
    if (item.keywords.some(keyword => userInput.includes(keyword))) {
        return item.response; // Return the matched response
    }
}
return "I’m here to help! Could you please rephrase your question?";
}

$(window).load(function () {
$messages.mCustomScrollbar();
setTimeout(function () {
    startChat();
}, 100);
});

function updateScrollbar() {
$messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
});
}

function setDate() {
d = new Date();
if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
}
}

function insertMessage() {
msg = $('.message-input').val();
if ($.trim(msg) == '') {
    return false;
}
$('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
setDate();
$('.message-input').val(null);
updateScrollbar();
setTimeout(function () {
    processResponse(msg);
}, 1000);
}

$('.message-submit').click(function () {
insertMessage();
});

$(window).on('keydown', function (e) {
if (e.which == 13) {
    insertMessage();
    return false;
}
});

function processResponse(userInput) {
let response = getResponse(userInput); // Get the response based on the user input
$('<div class="message new"><figure class="avatar"><img src="img/fav.png" /></figure>' + response + '</div>').appendTo($('.mCSB_container')).addClass('new');
setDate();
updateScrollbar();
}

function startChat() {
step = 0;
nextQuestion();
}

function nextQuestion() {
let questions = [
    {
        question: '👋 Hi there! Welcome to [Agency Name]\'s website. How can I assist you today?',
        choices: [
            'What services do you offer?',
            'Can you show me some of your recent projects?',
            'How do I get a quote?',
            'Do you offer consultations?',
            'I need help with something else'
        ]
    },
    {
        question: 'We offer a variety of services. Here’s a list of what we do:',
        choices: [
            '🎨 Graphic Design: Custom logos, branding, and promotional materials.',
            '🖥️ Web Design & Development: Full website design, e-commerce solutions, and custom coding.',
            '📱 Mobile App Design: User-friendly, mobile-first designs for apps.',
            '🎥 Video & Motion Graphics: Commercials, explainer videos, and animations.',
            '📚 Print Design: Brochures, posters, business cards, and more.',
            'Want to dive deeper into any of these?'
        ]
    },
    {
        question: 'We’re proud of the work we’ve done for our clients. Here’s a glimpse of some of our recent projects:',
        choices: [
            'E-commerce Website for [Client Name]: Check it out here.',
            'Brand Identity for [Client Name]: View the project here.',
            'Mobile App Design for [Client Name]: Discover the app here.',
            'Logo Design for [Client Name]: View the logo here.',
            'Would you like to explore any of these in more detail?'
        ]
    },
    {
        question: 'To give you an accurate quote, we need to know more about your project:',
        choices: [
            'Which service are you interested in?',
            'What’s your project deadline?',
            'What’s your estimated budget?',
            'You can find more information about our pricing structure on our Pricing Page.'
        ]
    },
    {
        question: 'Yes, we offer free consultations! In the consultation, we’ll:',
        choices: [
            'Understand your goals',
            'Provide tailored advice',
            'Discuss budget and timelines',
            'Want to schedule your free consultation?'
        ]
    },
    {
        question: 'What can I assist you with today?',
        choices: [
            'I have a specific question',
            'I need help finding the right service',
            'Contact customer support',
            'Explore our blog'
        ]
    }
];

if (step < questions.length) {
    let q = questions[step];
    let choiceButtons = q.choices.map(choice => `<button class="choice-button">${choice}</button>`).join(' ');
    $('<div class="message new"><figure class="avatar"><img src="img/fav.png" /></figure>' + q.question + '<br>' + choiceButtons + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    $('.choice-button').click(function () {
        let userChoice = $(this).text();
        $('<div class="message message-personal">I choose: ' + userChoice + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        step++;
        setTimeout(nextQuestion, 1000); // Go to next question after a brief pause
    });
} else {
    finalizeChat();
}
}

function finalizeChat() {
$('<div class="message new"><figure class="avatar"><img src="img/fav.png" /></figure>Thank you for your responses! You can reach out to us via the contact form <a class="wb-links" href="https://tangio.in/contact-tangio/#wpcf7-f3071-p3068-o1" target="_blank">here.</a></div>').appendTo($('.mCSB_container')).addClass('new');
setDate();
updateScrollbar();
}

// button chat switcher
// Toggle chat visibility and switch button functionality   
document.getElementById("chatbot-switch").addEventListener("click", function () {
const chatElement = document.querySelector(".chat");
const switchElement = document.getElementById("chatbot-switch");
const closeChatElement = document.querySelector(".close-chat");

if (chatElement && switchElement && closeChatElement) {
    // Toggle chat visibility
    if (chatElement.style.display === 'none' || chatElement.style.display === '') {
        chatElement.style.display = 'block'; // Show the chat
        switchElement.style.display = 'none'; // Hide the switch button when chat is visible
        closeChatElement.style.display = 'block'; // Show the close button when chat is visible
    } else {
        chatElement.style.display = 'none'; // Hide the chat
        switchElement.style.display = 'block'; // Show the switch button when chat is hidden
        closeChatElement.style.display = 'none'; // Hide the close button when chat is hidden
    }
}
});

// Close chat functionality
document.querySelector('.close-chat').addEventListener('click', function () {
const chatElement = document.querySelector('.chat');
const switchElement = document.getElementById('chatbot-switch');
const closeChatElement = document.querySelector('.close-chat');

if (chatElement) {
    chatElement.style.display = 'none'; // Hide the chat
}

if (switchElement) {
    switchElement.style.display = 'block'; // Show the chatbot switch button
}

if (closeChatElement) {
    closeChatElement.style.display = 'none'; // Hide the close button when chat is hidden
}
});
