import { useRef, useState } from 'react';
function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInput = useRef();
  const feedbackInput = useRef();
  function SubmitHandler(e) {
    e.preventDefault();

    const enterEmail = emailInput.current.value;
    const enterFeedback = feedbackInput.current.value;

    const reqBody = { email: enterEmail, text: enterFeedback }
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }
  return (
    <div>
      <h1>This is the Home Page</h1>
      <form onSubmit={SubmitHandler}>
        <div><label htmlFor="email">Enter Your Email</label>
          <input id="email" type="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Enter Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>
        <button>
          Send Feedback
        </button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  )
}
export default HomePage;
