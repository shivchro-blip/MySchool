import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// GoogleFonts returns non-const TextStyles, so fields are `static final`, not `static const`.
class AppTypography {
  AppTypography._();

  static final TextStyle displayXl = GoogleFonts.sourceSerif4(
    fontSize: 40,
    height: 1.15,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle headingLg = GoogleFonts.sourceSerif4(
    fontSize: 28,
    height: 1.2,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle headingMd = GoogleFonts.sourceSerif4(
    fontSize: 22,
    height: 1.25,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle headingSm = GoogleFonts.sourceSerif4(
    fontSize: 17,
    height: 1.3,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle body = GoogleFonts.inter(
    fontSize: 18,
    height: 1.7,
    fontWeight: FontWeight.w400,
  );

  static final TextStyle bodySm = GoogleFonts.inter(
    fontSize: 15,
    height: 1.65,
    fontWeight: FontWeight.w400,
  );

  static final TextStyle caption = GoogleFonts.inter(
    fontSize: 13,
    height: 1.5,
    fontWeight: FontWeight.w400,
  );

  static final TextStyle eyebrow = GoogleFonts.inter(
    fontSize: 12,
    height: 1.0,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.84, // 0.07em × 12px
  );

  static final TextStyle label = GoogleFonts.inter(
    fontSize: 14,
    height: 1.4,
    fontWeight: FontWeight.w500,
  );

  // Mobile clamp — use instead of displayXl on screens < 600px
  static final TextStyle displayXlMobile = GoogleFonts.sourceSerif4(
    fontSize: 28,
    height: 1.2,
    fontWeight: FontWeight.w500,
  );
}
