import { memo } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

/*
  Define a component to render the react friendly markdown parser
*/
function ArticleContent({ markdown = null, className = '' }) {
  return (
    <article className={className}>
      <ReactMarkdown rehypePlugins={[remarkGfm]} components={{ code: CodeBlock }}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

/*
  Define a custom reusable code block component
*/
const CodeBlock = ({ className = 'not-prose ', inline = false, children }) => {
  // trim white space and extra lines at the end
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      children[i] = children[i].trim();
    }
    // children[children.length - 1] = children[children.length - 1].trim();
  } else if (typeof children === 'string') children = children.trim();

  // compute the `language`
  let language = className?.slice('language-'.length).toLowerCase() || '';

  if (language === 'sh') language = 'bash';

  // parse and format "inline" CodeBlocks, (e.g. `single ticked`) or full code blocks (e.g. ``` )
  if (inline) return <span className="inline-code">{children}</span>;
  else
    return (
      <SyntaxHighlighter
        className={className}
        style={tomorrow}
        language={language}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    );
};

export default memo(ArticleContent);
