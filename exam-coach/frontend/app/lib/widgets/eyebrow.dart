import 'package:flutter/material.dart';
import '../config/theme.dart';

class Eyebrow extends StatelessWidget {
  final String text;
  final Color? color;
  const Eyebrow(this.text, {super.key, this.color});

  @override
  Widget build(BuildContext context) {
    return Text(
      text.toUpperCase(),
      style: AppTheme.eyebrowStyle(context).copyWith(color: color),
    );
  }
}
