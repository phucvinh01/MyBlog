export default function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
        return 'text-xl italic font-semibold text-gray-900 dark:text-white';
    }
}