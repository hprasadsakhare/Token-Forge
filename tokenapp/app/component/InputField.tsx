"use client";

import { client } from "@/lib/client";
import { useState } from "react";
import { Nebula } from "thirdweb/ai";
import { sepolia } from "thirdweb/chains";
import { useAppContext } from "@/context/ContextAPI";
import { ToastContainer, toast } from "react-toastify";

const InputField = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<string>("");

  const { activeAccount } = useAppContext();
  const copylink = () => {
    if (res) {
      navigator.clipboard.writeText(res);
      toast.success("Contract address copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.warning("No contract address to copy.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!tokenName || !tokenSymbol || !selectedChain) return;

    const executeMessage = `Deploy a new ERC20 token with name ${tokenName} and symbol ${tokenSymbol} on chain ${selectedChain}`;
    setLoading(true);
    try {
      const response = await Nebula.chat({
        client: client,
        account: activeAccount || undefined,
        message: executeMessage,
        contextFilter: {
          chains: [sepolia],
        },
      });
      console.log("Response: ", response.message);
      console.log("Response data: ", response.transactions[0].to);
      setRes(
        typeof response.transactions[0].to === "string"
          ? response.transactions[0].to
          : ""
      );

      toast.success(
        "Token deployed successfully with session ID: " + response.sessionId,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
      <p className="text-xl font-bold text-center text-white">
        Deploy ERC20 Token
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Token Name
          </label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g., MyToken"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Token Symbol
          </label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            placeholder="e.g., MTK"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Chain (Currently Supports Sepolia)
          </label>
          <input
            type="text"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            placeholder="e.g., sepolia"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 mt-4 text-white font-semibold rounded-lg ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 transition"
        }`}
      >
        {loading ? "Deploying..." : "Deploy Token"}
      </button>
      {res && (
        <div className="mt-4 text-white">
          <p>
            Contract deployed at:{" "}
            <span onClick={copylink} className="text-purple-400 font-mono">
              {res}
            </span>
          </p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default InputField;
