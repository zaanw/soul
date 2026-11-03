export const runtime='nodejs';
export async function GET(){
 const configured=!!(process.env.OPENROUTER_API_KEY&&process.env.OPENROUTER_MODEL);
 return Response.json({configured,models:process.env.OPENROUTER_MODEL?[process.env.OPENROUTER_MODEL]:[]},{headers:{'Cache-Control':'no-store'}});
}
