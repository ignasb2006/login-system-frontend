import { useState } from "react";

export default function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("weak");

  const [emailAlert, setEmailAlert] = useState("translateY(-100%)");
  const [passwordAlert, setPasswordAlert] = useState("translateY(-100%");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { 
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Slaptažodis turi būti bent 8 simbolių, turėti raidžių ir skaičių");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      window.location.href = "/profile";
    } else {
      alert(data.message);
    }
  };

  const checkEmail = (value) => {
    if (value.length > 0){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)){
        setEmailAlert("translateY(0%)");
      } else {
        setEmailAlert("translateY(-100%)");
      }
    } else {
      setEmailAlert("translateY(-100%)");
    }
    
    setEmail(value)
  }

  // Minimalus stiprumo vertinimas
  const checkStrength = (value) => {
    if (value.length > 0) {
      setPasswordAlert("translateY(0%)")
      if (value.length < 6) {
        setStrength("weak");
      } else if (value.length >= 6 && /[A-Za-z]/.test(value) && /\d/.test(value)) {
        setStrength("strong");
      } else {
        setStrength("average");
      }
    } else {
      setPasswordAlert("translateY(-100%)")
    }

    setPassword(value);
  };


  return (
    <div className="inputBox">
      
      <h2>Register</h2>
      <div className="inputBoxInputDiv">
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => checkEmail(e.target.value)}
          className="inputBoxTextInput"
        />
        <p className="inputAlert" id="emailInputAlert" style={{transform: emailAlert}}>Enter a valid e-mail address</p>
      </div>

      <div className="inputBoxInputDiv">
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => checkStrength(e.target.value)}
          className="inputBoxTextInput"
        />
        <div className="passwordInputAlert" style={{transform: passwordAlert}}>
          <div id="passwordStrengthBar">
            <div id="innerPasswordBar" className={strength}>

            </div>
          </div>
          <span>{strength}</span>
        </div>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
