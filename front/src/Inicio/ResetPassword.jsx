

export default function ResetPassword(){
    return(
        <main className="Esqueceusenha">
        <div className="container-reset-password">
        <div className="reset-password-form">
            <h1>Redefinir Senha</h1>
            <form>
                <div className="form-group-reset">
                    <label htmlFor="new-password">Nova Senha</label>
                    <input type="password" id="new-password" name="new-password" required/>
                </div>
                <div className="form-group-reset">
                    <label htmlFor="confirm-password">Confirmar Senha</label>
                    <input type="password" id="confirm-password" name="confirm-password" required/>
                </div>
                <button type="submit">Redefinir Senha</button>
            </form>
        </div>
    </div>
    </main>
    )
}