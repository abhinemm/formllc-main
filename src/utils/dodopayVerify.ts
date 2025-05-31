export async function verifyDataById(id: number,paymentId:string) {
    try {
      const response = await fetch('/api/dodopay', {
        method: 'POST',
        body: JSON.stringify({ 
            paymentId,
            companyId:id
         }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }
  