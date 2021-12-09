import { createGlobalStyle } from "styled-components";

export const AppStyle = createGlobalStyle`
    /* .5rem => 8px, 1rem => 16px, 1.5rem => 24px */

    /* VARIABLES CSS */
    :root {
        --header-height: 3rem;

        /* Colors */
        --first-color: #5B3A89;
        --title-color: #393939;
        --text-color: #707070;
        --text-color-light: #A6A6A6;
        --body-color: #FFFFFF;
        --info-color: #36ACC1;
        --success-color: #52AF50;
        --warning-color: #F9982D;
        --danger-color: #F34636;
        --container-color: #FFF;
        --custom-color-1: rgb(112, 203, 126);
        --rgba-color-0-5: rgba(0, 0, 0, 0.5);

        /* Font and Typography */
        --body-font: 'Poppins', sans-serif;

        --big-font-size: 2rem;
        --h1-font-size: 1.5rem;
        --h2-font-size: 1.25rem;
        --h3-font-size: 1.125rem;
        --normal-font-size: .938rem;
        --small-font-size: .813rem;
        --smaller-font-size: .75rem;

        /* Font Weight */
        --font-medium: 500;
        --font-semi-bold: 600;

        /* Margin */
        --m-0-25: .25rem;
        --m-0-5: .5rem;
        --m-0-75: .75rem;
        --m-1: 1rem;
        --m-1-5: 1.5rem;
        --m-2: 2rem;
        --m-2-5: 2.5rem;
        --m-3: 3rem;

        /* Z-Index */
        --z-tooltip: 10;
        --z-fixed: 100;
        --z-modal: 1000;

        /* Box Shadow */
        --bs-none: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        --bs-hover: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        --bs-inset: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
        
        --bs-smooth: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        --bs-soft: rgba(149, 157, 165, 0.2) 0px 8px 24px;;
        --bs-hard: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    /* Font for Large Devices */
    @media screen and (min-width: 968px) {
        :root {
            --big-font-size: 3rem;
            --h1-font-size: 2.25rem;
            --h2-font-size: 1.5rem;
            --h3-font-size: 1.25rem;
            --normal-font-size: 1rem;
            --small-font-size: .875rem;
            --smaller-font-size: .813rem;
        }
    }

    /* Variable Dark Theme */
    body.dark-theme {
        /* Colors */
        --title-color: #f1f3f2;
        --text-color: #c7d1cc;
        --body-color: #1d2521;
        --container-color: #27302c;
        --rgba-color-0-5: rgba(105, 105, 105, 0.5);
    }

    /* Base */
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: var(--body-font);
        font-size: var(--normal-font-size);
        background-color: var(--body-color);
        color: var(--text-color);
        /* transition: all .3s linear; */
    }

    h1, h2, h3, h4 {
        color: var(--title-color);
        font-weight: var(--font-semi-bold);
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    button {
        outline: none;
        border: none;
    }

    ::-webkit-scrollbar {
        width: .50rem;
        background-color: var(--body-color);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--first-color);
        border-radius: 3px;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #FFFFFF inset;
        transition: background-color 5000s ease-in-out 0s;
    }
`