import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

/**
 * Highlight JavaScript code using Prism.js
 * @param code - The JavaScript code to highlight
 * @returns HTML string with syntax highlighting
 */
export function highlightJavaScript(code: string): string {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
}

/**
 * Process question text to highlight code blocks
 * Replaces <pre class='code'>...</pre> blocks with syntax-highlighted versions
 * @param questionText - The question text containing code blocks
 * @returns Processed HTML string with syntax highlighting
 */
export function processQuestionText(questionText: string): string {
    return questionText.replace(
        /<pre class=['"]code['"]>([\s\S]*?)<\/pre>/g,
        (match, code) => {
            // Decode HTML entities that might be in the code
            const decodedCode = code
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .trim();

            const highlightedCode = highlightJavaScript(decodedCode);
            return `<pre class="language-javascript"><code class="language-javascript">${highlightedCode}</code></pre>`;
        }
    );
}