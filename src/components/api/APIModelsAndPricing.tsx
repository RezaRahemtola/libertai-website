import backgroundImage from "@/assets/background-left.png";
import backgroundImageMobile from "@/assets/background-left-mobile.png";
import { Brain, Eye, ExternalLink, Image, Lock, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";

interface TextCapabilities {
	context_window: number;
	function_calling: boolean;
	reasoning: boolean;
	tee?: boolean;
	vision: boolean;
}

interface Model {
	id: string;
	name: string;
	hf_id?: string;
	capabilities: {
		text?: TextCapabilities;
		image?: boolean;
		search?: boolean;
	};
	pricing: {
		text?: {
			price_per_million_input_tokens: number;
			price_per_million_output_tokens: number;
		};
		image?: number;
		search?: number;
	};
}

// Snapshot of the LTAI_PRICING Aleph aggregate published by 0xe1F7220D201C64871Cefb25320a8a588393eE508, taken 2026-07-20
const models: Model[] = [
	{
		id: "hermes-3-8b-tee",
		name: "Hermes 3 8B (TEE)",
		hf_id: "NousResearch/Hermes-3-Llama-3.1-8B",
		pricing: { text: { price_per_million_input_tokens: 0.15, price_per_million_output_tokens: 0.6 } },
		capabilities: {
			text: { tee: true, vision: false, reasoning: false, context_window: 16000, function_calling: true },
		},
	},
	{
		id: "gemma-4-31b-it",
		name: "Gemma 4 31B",
		hf_id: "google/gemma-4-31b-it",
		pricing: { text: { price_per_million_input_tokens: 0.15, price_per_million_output_tokens: 0.4 } },
		capabilities: {
			text: { tee: false, vision: true, reasoning: true, context_window: 262144, function_calling: true },
		},
	},
	{
		id: "qwen3.6-35b-a3b",
		name: "Qwen3.6-35B-A3B",
		hf_id: "Qwen/Qwen3.6-35B-A3B",
		pricing: { text: { price_per_million_input_tokens: 0.15, price_per_million_output_tokens: 0.5 } },
		capabilities: {
			text: { tee: false, vision: true, reasoning: true, context_window: 262144, function_calling: true },
		},
	},
	{
		id: "qwen3.6-27b",
		name: "Qwen3.6-27B",
		hf_id: "Qwen/Qwen3.6-27B",
		pricing: { text: { price_per_million_input_tokens: 0.15, price_per_million_output_tokens: 0.5 } },
		capabilities: {
			text: { tee: false, vision: true, reasoning: true, context_window: 262144, function_calling: true },
		},
	},
	{
		id: "qwen3.5-122b-a10b",
		name: "Qwen3.5-122B-A10B",
		hf_id: "Qwen/Qwen3.5-122B-A10B",
		pricing: { text: { price_per_million_input_tokens: 0.25, price_per_million_output_tokens: 1.75 } },
		capabilities: {
			text: { tee: false, vision: true, reasoning: true, context_window: 262144, function_calling: true },
		},
	},
	{
		id: "deepseek-v4-flash",
		name: "DeepSeek V4 Flash",
		hf_id: "deepseek-ai/DeepSeek-V4-Flash",
		pricing: { text: { price_per_million_input_tokens: 0.25, price_per_million_output_tokens: 1.75 } },
		capabilities: {
			text: { tee: false, vision: false, reasoning: true, context_window: 200000, function_calling: true },
		},
	},
	{
		id: "glm-5.2",
		name: "GLM-5.2",
		hf_id: "lukealonso/GLM-5.2-NVFP4",
		pricing: { text: { price_per_million_input_tokens: 1.4, price_per_million_output_tokens: 4.4 } },
		capabilities: {
			text: { vision: false, reasoning: true, context_window: 262144, function_calling: true },
		},
	},
	{
		id: "z-image-turbo",
		name: "Z-Image Turbo",
		hf_id: "Tongyi-MAI/Z-Image-Turbo",
		pricing: { image: 0.005 },
		capabilities: { image: true },
	},
];

const textModels = models.filter((m) => m.capabilities.text && m.pricing.text);
const imageModels = models.filter((m) => m.capabilities.image && m.pricing.image);

function CapabilityBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span className="inline-flex items-center gap-1 cursor-help">{icon}</span>
			</TooltipTrigger>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}

function TextModelCapabilities({ capabilities }: { capabilities: TextCapabilities }) {
	return (
		<div className="flex items-center justify-center gap-3">
			{capabilities.function_calling && (
				<CapabilityBadge icon={<Settings className="w-4 h-4 text-[#EA7AF4]" />} label="Function calling" />
			)}
			{capabilities.vision && <CapabilityBadge icon={<Eye className="w-4 h-4 text-[#EA7AF4]" />} label="Vision" />}
			{capabilities.reasoning && (
				<CapabilityBadge icon={<Sparkles className="w-4 h-4 text-[#EA7AF4]" />} label="Reasoning" />
			)}
			{capabilities.tee && (
				<CapabilityBadge icon={<Lock className="w-4 h-4 text-[#EA7AF4]" />} label="Trusted Execution Environment" />
			)}
		</div>
	);
}

export function APIModelsAndPricing() {
	return (
		<section className="relative w-full py-20 lg:py-40 md:py-32 bg-background overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 z-0">
				<img src={backgroundImage} alt="Background" className="absolute h-full w-full object-cover hidden md:block" />
				<img src={backgroundImageMobile} alt="Background" className="absolute h-full w-full object-cover md:hidden" />
			</div>

			{/* Content container */}
			<div className="container mx-auto px-4 md:px-6 lg:px-8 z-10 relative">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="mb-12 text-center md:text-left">
						<div className="inline-flex items-center space-x-2 text-sm mb-4">
							<span className="text-white/60">[ Open for business ]</span>
						</div>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Models and Pricing</h2>
					</div>

					{/* Text Models */}
					{textModels.length > 0 && (
						<>
							<h3 className="text-2xl font-bold text-white mb-6">Text Generation</h3>

							{/* Desktop Table */}
							<div className="hidden md:block">
								<table className="w-full">
									<thead>
										<tr className="border-b border-white/20">
											<th className="text-left py-4 text-sm font-satoshi">Model</th>
											<th className="text-center py-4 text-sm font-satoshi">Capabilities</th>
											<th className="text-center py-4 text-sm font-satoshi">Input (per 1M tokens)</th>
											<th className="text-center py-4 text-sm font-satoshi">Output (per 1M tokens)</th>
										</tr>
									</thead>
									<tbody>
										{textModels.map((model, index) => (
											<tr key={model.id} className={index !== textModels.length - 1 ? "border-b border-white/10" : ""}>
												<td className="py-6">
													<div className="flex items-center gap-3">
														<div>
															<div className="flex items-center gap-2">
																<Brain className="w-6 h-6 text-[#EA7AF4]" />
																<h3 className="text-white text-2xl">{model.name}</h3>
															</div>
															<p className="text-sm font-satoshi mt-1 max-w-md text-white/60">{model.id}</p>
														</div>
													</div>
												</td>
												<td className="py-6 text-center">
													{model.capabilities.text && <TextModelCapabilities capabilities={model.capabilities.text} />}
												</td>
												<td className="py-6 text-center text-2xl text-white">
													${model.pricing.text!.price_per_million_input_tokens.toFixed(2)}
												</td>
												<td className="py-6 text-center text-2xl text-white">
													${model.pricing.text!.price_per_million_output_tokens.toFixed(2)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Mobile Cards */}
							<div className="md:hidden space-y-6">
								{textModels.map((model) => (
									<div key={model.id} className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<Brain className="w-6 h-6 text-[#EA7AF4]" />
												<div>
													<h3 className="text-white">{model.name}</h3>
													<p className="text-xs text-white/60">{model.id}</p>
												</div>
											</div>
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<span>Capabilities:</span>
													<div className="text-white mt-1">
														{model.capabilities.text && (
															<TextModelCapabilities capabilities={model.capabilities.text} />
														)}
													</div>
												</div>
												<div>
													<span>Input Tokens:</span>
													<div className="text-white">
														${model.pricing.text!.price_per_million_input_tokens.toFixed(2)}
													</div>
												</div>
												<div>
													<span>Output Tokens:</span>
													<div className="text-white">
														${model.pricing.text!.price_per_million_output_tokens.toFixed(2)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}

					{/* Image Models */}
					{imageModels.length > 0 && (
						<>
							<h3 className="text-2xl font-bold text-white mb-6 mt-16">Image Generation</h3>

							{/* Desktop Table */}
							<div className="hidden md:block">
								<table className="w-full">
									<thead>
										<tr className="border-b border-white/20">
											<th className="text-left py-4 text-sm font-satoshi">Model</th>
											<th className="text-center py-4 text-sm font-satoshi">Price per image</th>
										</tr>
									</thead>
									<tbody>
										{imageModels.map((model, index) => (
											<tr key={model.id} className={index !== imageModels.length - 1 ? "border-b border-white/10" : ""}>
												<td className="py-6">
													<div className="flex items-center gap-3">
														<div>
															<div className="flex items-center gap-2">
																<Image className="w-6 h-6 text-[#EA7AF4]" />
																<h3 className="text-white text-2xl">{model.name}</h3>
															</div>
															<p className="text-sm font-satoshi mt-1 max-w-md text-white/60">{model.id}</p>
														</div>
													</div>
												</td>
												<td className="py-6 text-center text-2xl text-white">${model.pricing.image!.toFixed(3)}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Mobile Cards */}
							<div className="md:hidden space-y-6">
								{imageModels.map((model) => (
									<div key={model.id} className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<Image className="w-6 h-6 text-[#EA7AF4]" />
												<div>
													<h3 className="text-white">{model.name}</h3>
													<p className="text-xs text-white/60">{model.id}</p>
												</div>
											</div>
											<div className="text-sm">
												<span>Price per image:</span>
												<div className="text-white">${model.pricing.image!.toFixed(3)}</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}

					{/* Show all models button */}
					<div className="mt-8 text-center md:text-left">
						<a href="https://docs.libertai.io/apis/text/#available-models" target="_blank" rel="noopener noreferrer">
							<Button variant="glass" size="pill" className="font-satoshi text-white">
								<span>Show all models</span>
								<ExternalLink className="ml-2 h-4 w-4" />
							</Button>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
