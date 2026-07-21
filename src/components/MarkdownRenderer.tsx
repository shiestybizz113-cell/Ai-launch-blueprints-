import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert prose-blue max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-blue-800 dark:prose-code:text-blue-300 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
      <Markdown 
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ node, children, ...props }) {
            // Extract text for copy button
            const textContent = React.Children.toArray(children)
              .map(child => {
                if (React.isValidElement(child) && child.props) {
                  return (child.props as any).children || '';
                }
                return typeof child === 'string' ? child : '';
              })
              .join('');

            return (
              <div className="relative group">
                <button 
                  onClick={() => navigator.clipboard.writeText(textContent)}
                  className="absolute right-2 top-2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre {...props} className="overflow-x-auto p-4 rounded-lg bg-gray-900 text-sm">
                  {children}
                </pre>
              </div>
            );
          }
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
