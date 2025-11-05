"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import { useSearchParams } from "next/navigation";
import { useRedefinirSenha } from "./hooks/useRedefinirSenha";

export function NovaSenhaPage() {
  const { novaSenha, setNovaSenha, FnRedefinirSenha } = useRedefinirSenha();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  return (
    <>
      <main className={styles.containerMain}>
        <div className={styles.containerForm}>
          <div>
            <div className={styles.containerContent}>
              <div className={styles.containerFormulario}>
                {/* <h2>logo</h2> */}
                <Image
                  src={"/loginImage.png"}
                  alt="Software de gestão de autoescola"
                  width={356}
                  height={155}
                  className={styles.Image}
                />
                <form
                  style={{ width: "100%" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    FnRedefinirSenha();
                  }}
                >
                  <div className={styles.containerInputs}>
                    <div className={styles.containerInput}>
                      <label htmlFor="">Usuário</label>
                      <InputComponent value={username || ""} isDisable />
                    </div>
                    <div className={styles.containerInput}>
                      <label htmlFor="">E-mail</label>
                      <InputComponent value={email || ""} isDisable />
                    </div>
                    <div className={styles.containerInput}>
                      <label htmlFor="">Nova Senha</label>
                      <InputComponent
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        type="password"
                      />
                    </div>
                    <div className={styles.containerInput}>
                      <ButtonComponent
                        type="submit"
                        style={{
                          width: "100%",
                          fontWeight: "600",
                          height: "55px",
                        }}
                      >
                        Alterar Senha
                      </ButtonComponent>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
