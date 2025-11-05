"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { Roboto } from "next/font/google";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/ButtonComponent";
import {
  MdBusiness,
  MdCalendarMonth,
  MdDashboard,
  MdExitToApp,
  MdInfo,
  MdKeyboardDoubleArrowLeft,
  MdMenu,
  MdMore,
  MdOutlineKeyboardArrowRight,
  MdPayments,
  MdPerson,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import Cookies from "js-cookie";
import { Tooltip } from "primereact/tooltip";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
const poppins = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export function DashboardComponent({
  children,
  isAdmin,
}: {
  children: ReactNode;
  isAdmin?: boolean;
}) {
  const asPath = usePathname();
  const router = useRouter();

  function setStyleLink(asPathActive: string) {
    return asPath == asPathActive
      ? styles.containerCardPageActive
      : styles.containerCardPage;
  }
  const [activeDashboard, setActiveDashboard] = useState(false);

  function logOut() {
    Cookies.remove("tokenEfinancas");
    Cookies.remove("nomeUsuarioEfinance");

    router.push("/");
  }

  function stringAvatar(name: string) {
    const nomeUppercase = name?.toUpperCase();

    return `${
      nomeUppercase?.split(" ")[0]
        ? nomeUppercase?.split(" ")[0]?.charAt(0)
        : ""
    }${
      nomeUppercase?.split(" ")[1]
        ? nomeUppercase?.split(" ")[1]?.charAt(0)
        : ""
    }`;
  }

  return (
    <>
      <div className={styles.containerGeral}>
        <header className={`${poppins.className} ${styles.header}`}>
          <nav>
            <div className={styles.containerInfosUsuarios}>
              <div
                className={styles.containerBreadCrumbHambuguer}
                onClick={() => setActiveDashboard(!activeDashboard)}
              >
                <span>
                  <MdMenu size={20} />
                </span>
              </div>
              <div className={styles.containerBreadCrumb}>
                <span>{capitalizeFirstLetter(asPath?.replace("/", ""))}</span>
              </div>
           
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  marginTop: "0.2rem",
                }}
              >
                <span>
                  {" "}
                  <MdMore size={20} color="#7c42e0" />{" "}
                </span>
                <span>
                  {" "}
                  <MdInfo size={20} color="#7c42e0" />
                </span>
                <span onClick={() => router.push("/usuario")}>
                  <Tooltip target=".custom-target-icon" />
                  <i
                    className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                    data-pr-tooltip="Empresa"
                    data-pr-position="left"
                    data-pr-at="right+45 top+50"
                    data-pr-my="left center-1"
                    style={{ cursor: "pointer" }}
                  >
                    <span style={{ color: "rgb(201, 72, 72)" }}>
                      <MdBusiness size={23} color="#7c42e0" />
                    </span>
                  </i>
                </span>
              </div>
            </div>
          </nav>
        </header>

        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <div
            className={`${
              activeDashboard ? styles.dashboardActive : styles.dashboard
            }`}
          >
            <div
              className={styles.containerArrowBack}
              onClick={() => setActiveDashboard(false)}
            >
              <MdKeyboardDoubleArrowLeft size={18} />
            </div>
            <div className={styles.containerLogo}>
              <Image
                src={"/logoBlack.png"}
                alt="Software de controle de finanças"
                height={90}
                width={195}

                // className={styles.Image}
              />
            </div>
            {/* <div className={styles.loginUser}>
              <div className={styles.containerImageUser}>
                <Avatar
                  icon="pi pi-user"
                  label={stringAvatar("sawyo Fernands")}
                  size="normal"
                  style={{
                    backgroundColor: "#7c42e0",
                    color: "#ffffff",
                    width: "4rem",
                    height: "4rem",
                  }}
                  shape="circle"
                />
              </div>
              <div
                style={{
                  maxWidth: "175px",
                  wordWrap: "break-word",
                  marginTop: ".5rem",
                  fontSize: ".85rem",
                }}
              >
                <span style={{ maxWidth: "175px" }}>
                  {isAdmin ? "Administrador" : "sawyo" ?? ""}
                </span>
              </div>
            </div> */}
            <aside className={styles.containerAside}>
              <div className={styles.aside}>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/indicadores")}
                  onClick={() => router.push("/indicadores")}
                >
                  {/* <div className={styles.name}> */}
                  {/* <BsGraphUp fontSize="medium" color="#7c42e0" /> */}
                  <MdDashboard size={18} />
                  Dashboard
                  {/* </div> */}
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/vendas")}
                  onClick={() => router.push("/vendas")}
                >
                  <MdPayments size={20} />
                  Vendas
                  {/* <MdOutlineKeyboardArrowRight
                    fontSize="medium"
                    color="#FFF"
                  /> */}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/recebimentos")}
                  onClick={() => router.push("/recebimentos")}
                >
                  <MdPayments size={20} />
                  Recebimentos
                  {/* <MdOutlineKeyboardArrowRight
                    fontSize="medium"
                    color="#FFF"
                  /> */}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/cadastroClientes")}
                  onClick={() => {
                    router.push("/cadastroClientes");
                  }}
                >
                  <MdPerson size={20} />
                  Clientes
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>

                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/estoque")}
                  onClick={() => router.push("/estoque")}
                >
                  <FaBoxes size={20} />
                  Estoque
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/agenda")}
                  onClick={() => router.push("/agenda")}
                >
                  <MdCalendarMonth size={20} />
                  Agenda
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/servicos")}
                  onClick={() => router.push("/servicos")}
                >
                  <MdSettings size={20} />
                  Serviços
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/repasse")}
                  onClick={() => router.push("/repasse")}
                >
                  <MdPayments size={20} />
                  Repasse
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  style={{ display: `${isAdmin ? "none" : "flex"}` }}
                  className={setStyleLink("/configuracoes")}
                  onClick={() => router.push("/configuracoes")}
                >
                  <MdSettings size={20} color="#7cFFF42e0" />
                  Configurações
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
                <div
                  className={setStyleLink("/configuracoes")}
                  style={{
                    display: `${isAdmin ? "none" : "flex"}`,
                    justifyContent: "center",
                  }}
                  onClick={logOut}
                >
                  <MdExitToApp size={20} color="#7cFFF42e0" />
                  Sair
                  {/*<MdOutlineKeyboardArrowRight size={16} color="#FFF" />*/}
                </div>
              </div>
              {/* <div className={styles.containerButtonExit} style={{ marginTop: "20px" }}>
                <ButtonComponent
                  style={{ width: "80%", height: "42px",background: "#a5a5a5" }}
                  onClick={logOut}
                >
                  Sair
                </ButtonComponent>
              </div> */}
            </aside>
          </div>

          <div style={{ display: "flex", width: "calc(100% - 226px)" }}>
            {/* <header className={`${poppins.className} ${styles.header}`}>
              <nav>
                <div className={styles.containerInfosUsuarios}>
                  <div
                    className={styles.containerBreadCrumbHambuguer}
                    onClick={() => setActiveDashboard(!activeDashboard)}
                  >
                    <span>
                      <MdMenu size={20} />
                    </span>
                  </div>
                  <div className={styles.containerBreadCrumb}>
                    <span>
                      {capitalizeFirstLetter(asPath?.replace("/", ""))}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    <span>
                      {" "}
                      <MdMore size={23} color="#7c42e0" />{" "}
                    </span>
                    <span>
                      {" "}
                      <MdInfo size={23} color="#7c42e0" />
                    </span>
                    <span onClick={() => router.push("/usuario")}>
                      <Tooltip target=".custom-target-icon" />
                      <i
                        className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                        data-pr-tooltip="Empresa"
                        data-pr-position="left"
                        data-pr-at="right+45 top+50"
                        data-pr-my="left center-1"
                        style={{ cursor: "pointer" }}
                      >
                        <span style={{ color: "rgb(201, 72, 72)" }}>
                          <MdBusiness size={23} color="#7c42e0" />
                        </span>
                      </i>
                    </span>
                  </div>
                </div>
              </nav>
            </header> */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
