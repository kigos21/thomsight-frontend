export const handleGoogleLogin = (): void => {
  // window.location.href = "http://127.0.0.1:8000/auth/redirect";
  window.location.href = "https://thomsight.com/auth/redirect";
};

// export const useGoogleData = (): void => {
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/check-auth", {
//           credentials: "include",
//         });

//         if (response.ok) {
//           const data = await response.json();

//           if (data.authenticated) {
//             window.location.href = "/reports/discussion";
//           } else {
//             console.error("User is not authenticated");
//           }
//         } else {
//           console.error("User is not authenticated");
//         }
//       } catch (error) {
//         console.error("Error checking login status:", error);
//       }
//     };

//     checkLoginStatus();
//   }, []);
// };
