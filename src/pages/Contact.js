export default function Contact() {
  return (
    <main className="mr-4">
      <h2 className="text-3xl mb-8">Contact</h2>

      <form className="pt-8 text-base leading-6 text-gray-700">
        <label className="block text-gray-700 font-medium mb-2" for="grid-first-name">
          Name <span className="text-red-500">*</span>
        </label>
        <input required className="block w-full max-w-lg bg-gray-200 text-gray-700 border rounded
          p-3 mb-3 leading-tight  focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
        
        <label className="block text-gray-700 font-medium mb-2" for="grid-first-name">
          Email <span className="text-red-500">*</span>
        </label>
        <input required className="block w-full max-w-lg bg-gray-200 text-gray-700 border rounded
          p-3 mb-3 leading-tight  focus:bg-white" id="grid-first-name" type="email" placeholder="Email"/>
        
        <label className="block text-gray-700 font-medium mb-2" for="grid-first-name">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea required className="resize-y block w-full max-w-lg bg-gray-200 text-gray-700 border rounded
          p-3 mb-3 leading-tight  focus:bg-white" placeholder="Your message..."></textarea>
        
        <button className="bg-slate-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </main>
  );
}