import 'package:flutter/material.dart';
import '../config/theme.dart';

// Standalone "Continue with Google" button.
// Taps delegate to [onPressed]; pass null to disable.
class GoogleSignInButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const GoogleSignInButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    final cardBg    = AppTheme.cardOf(context);
    final borderCol = AppTheme.text2Of(context).withValues(alpha: 0.25);

    return SizedBox(
      width: double.infinity,
      height: 48,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          backgroundColor: cardBg,
          side:            BorderSide(color: borderCol),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(100),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _GoogleLogo(size: 20),
            const SizedBox(width: 10),
            Text(
              'Continue with Google',
              style: TextStyle(
                fontSize:   14,
                fontWeight: FontWeight.w600,
                color:      AppTheme.textOf(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Inline Google "G" logo painted with CustomPainter — no image asset needed.
class _GoogleLogo extends StatelessWidget {
  final double size;
  const _GoogleLogo({required this.size});

  @override
  Widget build(BuildContext context) =>
      CustomPaint(size: Size(size, size), painter: _GoogleLogoPainter());
}

class _GoogleLogoPainter extends CustomPainter {
  static const _blue   = Color(0xFF4285F4);
  static const _red    = Color(0xFFEA4335);
  static const _yellow = Color(0xFFFBBC05);
  static const _green  = Color(0xFF34A853);

  @override
  void paint(Canvas canvas, Size size) {
    final r  = size.width / 2;
    final c  = Offset(r, r);

    canvas.drawCircle(c, r, Paint()..color = Colors.white);

    final sw   = r * 0.32;           // stroke width
    final rr   = r * 0.66;           // arc centre radius
    final rect = Rect.fromCircle(center: c, radius: rr);

    // Stroked arcs form the ring (useCenter: false = arc, not pie wedge).
    Paint mk(Color col) => Paint()
      ..color       = col
      ..style       = PaintingStyle.stroke
      ..strokeWidth = sw
      ..strokeCap   = StrokeCap.butt;

    // 0 rad = 3-o'clock; clockwise positive.
    // 60° gap on the right side (±0.52 rad) reserved for the crossbar.
    canvas.drawArc(rect, 0.52, 1.57, false, mk(_yellow));  // 30°→120°
    canvas.drawArc(rect, 2.09, 0.79, false, mk(_green));   // 120°→165°
    canvas.drawArc(rect, 2.88, 1.57, false, mk(_red));     // 165°→255°
    canvas.drawArc(rect, 4.45, 1.31, false, mk(_blue));    // 255°→330°

    // Blue crossbar — fills the right-side gap.
    canvas.drawRect(
      Rect.fromLTWH(c.dx, c.dy - sw / 2, rr + sw / 2, sw),
      Paint()..color = _blue,
    );
  }

  @override
  bool shouldRepaint(_GoogleLogoPainter _) => false;
}
