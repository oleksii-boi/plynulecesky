import AppKit
import CoreImage
import Vision

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: swift remove-portrait-background.swift <input> <output>\n", stderr)
    exit(1)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
let context = CIContext()

guard
    let inputImage = CIImage(contentsOf: inputURL),
    let cgImage = context.createCGImage(inputImage, from: inputImage.extent)
else {
    fputs("Could not read the input image.\n", stderr)
    exit(1)
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(cgImage: cgImage)
try handler.perform([request])

guard let result = request.results?.first else {
    fputs("No foreground subject was detected.\n", stderr)
    exit(1)
}

let maskBuffer = try result.generateScaledMaskForImage(
    forInstances: result.allInstances,
    from: handler
)
let mask = CIImage(cvPixelBuffer: maskBuffer)
let transparent = CIImage(color: .clear).cropped(to: inputImage.extent)
let output = inputImage.applyingFilter(
    "CIBlendWithMask",
    parameters: [
        kCIInputBackgroundImageKey: transparent,
        kCIInputMaskImageKey: mask,
    ]
)

try context.writePNGRepresentation(
    of: output,
    to: outputURL,
    format: .RGBA8,
    colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
)
