const AccessDenied = () => {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
          <h1 className="text-4xl font-extrabold  mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">Sorry, you don't have permission to access this page.</p>
        </div>
      </div>
    );
  };
  
  export default AccessDenied;