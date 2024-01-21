"use client"

export const PrintPage = async () => {

    const printitem = () => {
        window.print()
    }


    return (
        <div className=" flex justify-end print:hidden mb-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={printitem} >Print</button>
        </div>
    );
};

