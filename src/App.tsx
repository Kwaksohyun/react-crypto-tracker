import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styled from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');  

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor}
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  `;

const ToggleContainer = styled.div`
  position: fixed;
  left: 1rem;
  top: 1.5rem;
`;

const Toggle = styled.div`
    position: relative;
    display: block;
    width: 4rem;
    height: 2rem;
    border-radius: 2rem;
    background-color: #222;
    transition: 0.5s;
    cursor: pointer;
    box-shadow: inset 0 0.1rem 0.75rem rgba(0, 0, 0, 0.1),
                inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1),
                inset 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.1);
    &.toggle-checked {
        background-color:  #e0e0e0;
        box-shadow: inset 0 0.025rem 0.75rem rgba(0, 0, 0, 0.1),
                    inset 0 0.025rem 0.1rem rgba(0, 0, 0, 0.1),
                    inset 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.05);
    }
`;

const Indicator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: linear-gradient(to bottom, #444, #222);
    transform: scale(0.9);
    transition: 0.4s;
    box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.5),
                inset 0 0.05rem 0.05rem rgba(255, 255, 255, 0.2),
                inset 0 -0.05rem 0.05rem rgba(255, 255, 255, 0.2);
    &.toggle-checked {
        left: 2rem;
        background: linear-gradient(to bottom, #eaeaea, #f9f9f9);
        box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.1),
                    inset 0 0.05rem 0.05rem rgba(255, 255, 255, 1),
                    inset 0 -0.05rem 0.05rem rgba(255, 255, 255, 1);
    }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {/* 조건부 스타일링: dark-mode(default)이 아닐 경우 toggle-checked 클래스 추가 */}
        <ToggleContainer>
          <Toggle className={isDark ? "" : "toggle-checked"} onClick={toggleDarkAtom} >
            <Indicator className={isDark ? "" : "toggle-checked"} />
          </Toggle>
        </ToggleContainer>
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;