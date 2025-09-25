import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Hooks/useAuth";
import { generateLinks } from "../../../../Utils/helper";
import "./style.css";
import { images } from "../../../../Assets";
import { useThemeSettings } from "../../../../Context/ThemeContext";
import useThemeAsset from "../../../../Hooks/useThemeAsset";

const Sidebar = (props) => {
    const [user, setUser] = useState({});
    const urlPath = window.location.pathname;
    const { role } = useAuth();
    const { theme } = useThemeSettings();
    const defaultLogo = useThemeAsset(theme?.primaryLogo, images.HeaderLogo || images.Logo);
    const compactLogo = useThemeAsset(
        theme?.secondaryLogo,
        images.HeaderLogoMobile || defaultLogo
    );
    const [headerLogo, setHeaderLogo] = useState(defaultLogo);

    useEffect(() => {
        setUser(role);
    }, [role]);

    useEffect(() => {
        if (props.sideclassName === "collapsed") {
            setHeaderLogo(compactLogo);
        } else {
            setHeaderLogo(defaultLogo);
        }
    }, [props.sideclassName, compactLogo, defaultLogo]);

    const Links = generateLinks(role);

    return (
        <>
            <div className={`sidebar ${props.sideclassName}`} id="sidebar">
                <div className="sidebarBrand">
                    <Link to={"/admin/dashboard"} className="sidebarBrand__logo">
                        <img src={headerLogo || defaultLogo} alt="Severin Admin" />
                    </Link>
                    <div className="sidebarBrand__meta">
                        <span className="sidebarBrand__title">Severin</span>
                        <span className="sidebarBrand__subtitle">Admin Panel</span>
                    </div>
                </div>
                <ul className="sidebar__nav list-unstyled">
                    {Links.map((element, index) => (
                        <li className="sidebar-li" key={index}>
                            <Link
                                className={`sideLink ${[element.path, element.link, element.name]
                                        .filter(Boolean)
                                        .some((val) => urlPath.includes(val))
                                        ? "active"
                                        : ""
                                    }`}
                                to={element.path || element.link || "/"}
                            >
                                <span className="sideIcon">
                                    {element.image && <element.image />}
                                </span>
                                <span className="sideLinkText">
                                    {element.name || element.label || "Link"}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export { Sidebar };
export default Sidebar;
