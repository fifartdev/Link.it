export const metadata = {
    title: "App Page",
    description: "A Link Bio style App",
  };
  
  export default function UserPageLayout({ children }) {
    return (
        <div className="min-h-screen min-w-full flex flex-col bg-white items-center py-2 px-1">
            <div className="flex flex-col bg-teal-600 px-10 text-white items-center rounded-lg shadow-lg min-h-svh w-full">
                 {children}
            </div>
        </div>
    );
  }
  