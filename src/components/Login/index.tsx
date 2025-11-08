"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import { useAutenticarUsuario } from "./hooks/useAutenticarUsuario";
import { ModalRecuperarSenha } from "./ModalRecuperarSenha";
import Cookies from "js-cookie";

export function LoginPage() {
  const router = useRouter();
  const [bolAutenticado, setBolAutenticado] = useState(false);
  const { formulario, FnAutenticarUsuario } =
    useAutenticarUsuario(setBolAutenticado);
  const [openModalRecuperarSenha, setOpenModalRecuperarSenha] = useState(false);
  const { register, reset } = formulario;

  const logOut = () => {
    setBolAutenticado(false);
    Cookies.set("tokenEfinancas", "");
    Cookies.set("nomeUsuarioEfinance", "");
    Cookies.set("bolAdministrador", "");
    Cookies.set("usuarioIdEfinance", "");
    reset({
      password: "",
      username: "",
    });

    document.getElementById("inputUsuario")?.focus();
  };
  return (
    <>
      <ModalRecuperarSenha
        openModal={openModalRecuperarSenha}
        setOpenModal={setOpenModalRecuperarSenha}
      />
      <main className={styles.containerMain}>
        <div className={styles.containerMessage}>
          <Image
            src={"/login.svg"}
            alt="Software de gestão de finanças"
            width={460}
            height={420}
            className={styles.Image}
          />
          <h1 style={{ marginTop: "-1rem" }}>
            Gerencie sua barbearia com eficiência.
          </h1>
        </div>
        <div className={styles.containerForm}>
          <div>
            <div className={styles.containerContent}>
              <div className={styles.containerFormulario}>
                {/* <h2>logo</h2> */}
                <Image
                  src={"/loginImage.png"}
                  alt="Software de gestão de barbearias"
                  width={400}
                  height={170}
                  className={styles.Image}
                />
                <form
                  style={{ width: "100%" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    FnAutenticarUsuario();
                  }}
                >
                  <div className={styles.containerInputs}>
                    <div className={styles.containerInput}>
                      <label htmlFor="">Usuário</label>
                      <InputComponent
                        id="inputUsuario"
                        {...register("username")}
                      />
                    </div>
                    <div className={styles.containerInput}>
                      <label htmlFor="">Senha</label>
                      <InputComponent
                        type="password"
                        {...register("password")}
                      />
                    </div>
                    <div className={styles.containerInfoSenha}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpenModalRecuperarSenha(true)}
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <div className={styles.containerInput}>
                      {bolAutenticado ? (
                        <div className={styles.containerButtons}>
                          <ButtonComponent
                            onClick={logOut}
                            style={{
                              width: "100%",
                              fontWeight: "600",
                              height: "55px",
                              opacity: "0.5rem !important",
                              background: bolAutenticado ? "#a5a5a5" : "",
                            }}
                          >
                            Sair
                          </ButtonComponent>
                        </div>
                      ) : (
                        <ButtonComponent
                          type="submit"
                          style={{
                            width: "100%",
                            fontWeight: "600",
                            height: "55px",
                          }}
                        >
                          Entrar
                        </ButtonComponent>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className={styles.containerDireitosReservados}>
                <span>Copyright ©. Todos os direitos reservados.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
