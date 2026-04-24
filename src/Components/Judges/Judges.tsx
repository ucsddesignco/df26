import "./Judges.scss";
import { useSiteTheme, siteThemeToEmbla } from "../../context/SiteThemeContext";
import { EmblaCarousel } from "./EmblaCarousel";

export const Judges = () => {
    const { theme } = useSiteTheme();
    return (
        <section id="judges" className="judges-section">
            <h1>Meet Your Judges</h1>
            <EmblaCarousel theme={siteThemeToEmbla(theme)} />
        </section>
    )
}




