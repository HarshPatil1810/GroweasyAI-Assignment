import UploadBox from "./components/UploadBox";
import ThemeToggle from "./components/ThemeToggle";
import SettingsPanel from "./components/SettingsPanel";

export default function Home() {

return (

<main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

<div className="py-16">

<h1 className="text-center text-5xl font-extrabold">

🚀 GrowEasy AI Importer

</h1>

<p className="text-center mt-4 text-gray-600">

Upload any CSV and let AI automatically detect CRM fields.

</p>
<SettingsPanel/>

<UploadBox/>


</div>

</main>

)

}