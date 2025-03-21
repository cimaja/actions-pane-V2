import { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';

export const UICollectionsIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return (
    <svg
      ref={ref}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.75 3.5C5.85051 3.5 3.5 5.85051 3.5 8.75C3.5 11.3949 5.45578 13.5829 8 13.9468V15.4588C4.62504 15.0857 2 12.2244 2 8.75C2 5.02208 5.02208 2 8.75 2C12.2244 2 15.0857 4.62504 15.4588 8H13.9468C13.5829 5.45578 11.3949 3.5 8.75 3.5ZM12.25 9C10.4551 9 9 10.4551 9 12.25V18.75C9 20.5449 10.4551 22 12.25 22H18.75C20.5449 22 22 20.5449 22 18.75V12.25C22 10.4551 20.5449 9 18.75 9H12.25ZM10.5 12.25C10.5 11.2835 11.2835 10.5 12.25 10.5H18.75C19.7165 10.5 20.5 11.2835 20.5 12.25V18.75C20.5 19.7165 19.7165 20.5 18.75 20.5H12.25C11.2835 20.5 10.5 19.7165 10.5 18.75V12.25Z"
        fill="currentColor"
      />
    </svg>
  );
});

UICollectionsIcon.displayName = 'UICollectionsIcon';

export default UICollectionsIcon;
