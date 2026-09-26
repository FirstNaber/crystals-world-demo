// Builds public/og.jpg (1200×630 share image) from two of the shop's own photos.
// Run: swiftc scripts/og.swift -o /tmp/og && /tmp/og
import AppKit
let W: CGFloat = 1200, H: CGFloat = 630
let out = NSImage(size: NSSize(width: W, height: H))
func fill(_ img: NSImage, _ r: NSRect) {
  let s = max(r.width / img.size.width, r.height / img.size.height)
  let w = img.size.width * s, h = img.size.height * s
  img.draw(in: NSRect(x: r.midX - w / 2, y: r.midY - h / 2, width: w, height: h), from: .zero, operation: .sourceOver, fraction: 1)
}
out.lockFocus()
NSColor(white: 0.07, alpha: 1).setFill(); NSRect(x: 0, y: 0, width: W, height: H).fill()
NSGraphicsContext.saveGraphicsState(); NSBezierPath(rect: NSRect(x: 0, y: 0, width: 560, height: H)).addClip()
fill(NSImage(contentsOfFile: "assets-src/s-storefront-night.jpg")!, NSRect(x: 0, y: 0, width: 560, height: H)); NSGraphicsContext.restoreGraphicsState()
NSGraphicsContext.saveGraphicsState(); NSBezierPath(rect: NSRect(x: 600, y: 0, width: 600, height: H)).addClip()
fill(NSImage(contentsOfFile: "assets-src/p-amethyst-tower.jpg")!, NSRect(x: 600, y: 0, width: 600, height: H)); NSGraphicsContext.restoreGraphicsState()
NSColor(white: 0, alpha: 0.72).setFill(); NSRect(x: 0, y: 0, width: W, height: 150).fill()
let serif = NSFont(name: "Didot", size: 60) ?? NSFont.systemFont(ofSize: 60)
("CRYSTALS WORLD" as NSString).draw(at: NSPoint(x: 48, y: 66), withAttributes: [.font: serif, .foregroundColor: NSColor.white, .kern: 6])
("Crystals · Minerals · Jewelry — 3202 Guadalupe St, Austin, Texas" as NSString).draw(at: NSPoint(x: 50, y: 30), withAttributes: [.font: NSFont.systemFont(ofSize: 22), .foregroundColor: NSColor(white: 1, alpha: 0.82)])
out.unlockFocus()
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(W), pixelsHigh: Int(H), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
out.draw(in: NSRect(x: 0, y: 0, width: W, height: H)); NSGraphicsContext.restoreGraphicsState()
try! rep.representation(using: .jpeg, properties: [.compressionFactor: 0.85])!.write(to: URL(fileURLWithPath: "public/og.jpg"))
