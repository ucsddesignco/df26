interface JudgeLinkProps {
    href?: string;
    target?: "_blank" | "_self";
    ariaLabel?: string;
    image: string;
    name: string;
  }

export const ImgJudge = (props: JudgeLinkProps) => {
    return (
        <a href={props.href} target={props.target} aria-label={props.ariaLabel}>
            <div>
                <img src={props.image} alt={props.name} />
                {/* <p>{props.name}</p> */}
            </div>
        </a>
    )
}