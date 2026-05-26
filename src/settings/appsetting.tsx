export const appsettings = {
    apiUrl: import.meta.env.DEV 
        ? "https://localhost:7286/api/" 
        : "https://crudapi20260524010927-a4eyhrhcfzgudyfx.centralus-01.azurewebsites.net/api/"
}