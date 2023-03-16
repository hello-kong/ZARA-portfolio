import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`


    ${reset}
    html {
        height: 100%;
        font-family: 'Roboto Condensed',"Gothic A1";
    }
    body {
        width: 100%;
    }

    a {
        text-decoration: none;
        color: #000;
        cursor: pointer;
    }

    p {
        font-size: 14px;
        line-height: 1.5;
    }

    button {
        cursor: pointer;
    }

    hr {
            height: 1px;
            border: 0;
            background-color: #f1f1f1;
        }
 
    
`;

export default GlobalStyles;
