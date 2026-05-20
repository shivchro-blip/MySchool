// BRAND LOGO CONFIG — update here to change logo globally
// Asset path: assets/images/School_Brand_Logo.png
// Declared in pubspec.yaml under flutter > assets > assets/images/
import 'package:flutter/material.dart';

class BrandLogo extends StatelessWidget {
  // height drives size; width scales automatically via BoxFit.contain
  const BrandLogo({super.key, this.height = 120});

  final double height;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/images/School_Brand_Logo.png',
      height: height,
      fit: BoxFit.contain,
    );
  }
}
