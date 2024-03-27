import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as SyntaxHighlightStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

export const SyntaxHighlighting = {
  // @ts-ignore
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={SyntaxHighlightStyle}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
