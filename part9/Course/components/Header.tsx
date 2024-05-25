import {HeaderProps} from "../src/types"

const Header = (props: HeaderProps) => {
    const header = props.name
      return(
        <div>
    <h1>{header}</h1>
        </div>
      )
    }

export default Header