
function LoginForm() {

    return(
        <form id='login-form' 
        // onSubmit={handleSubmit}
        >
            <label>
            Username:
            </label>
            <input
                type='text'
                placeholder="Enter your username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
            />
            <label>
            Password:
            </label>
            <input
                type='password'
                placeholder="Enter your password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default LoginForm;